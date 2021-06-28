import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FileUpload } from '../models/fileUpload';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private basePath = 'SuizaAlertaApp/EvidenciaUME';
  public ruta: string;
  

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload, posicion: string, vehiculo: string, ruta_key: string): Observable<number> {

    const currentDate = new Date();
    const fechaSistema = formatDate(currentDate, 'dd-MM-yyyy', 'en-US');
    const horaActual = formatDate(currentDate, 'HH:mm:ss', 'en-US');

    const filePath = `${this.basePath}/${fechaSistema +'_'+ horaActual +'_'+ fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {

          console.log(ruta_key);
          

          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, posicion, vehiculo);

          this.ruta = downloadURL;        


          console.log(this.ruta);
          
          

          /* if(posicion == "frontal") {
            this.itemsFrontal.push(downloadURL)
          } else if( posicion == "izquierda") {
            this.itemsIzquierda.push(downloadURL)
          } else if( posicion == "derecha") {
            this.itemsDerecha.push(downloadURL)
          } else if( posicion == "posterior") {
            this.itemsPosterior.push(downloadURL)
          } else {

          } */
          
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

 /*  getFotoFrontal() {
    return this.itemsFrontal;
  }

  getFotoIzquierda() {
    return this.itemsIzquierda;
  }

  getFotoDerecha() {
    return this.itemsDerecha;
  }

  getFotoPosterior() {
    return this.itemsPosterior;
  } */


  private saveFileData(fileUpload: FileUpload, posicion: string, vehiculo: string): void {
    this.db.list(this.basePath+"/"+vehiculo+"/"+posicion).set("url",fileUpload.url);
  }

  /* getFiles(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  } */
}
