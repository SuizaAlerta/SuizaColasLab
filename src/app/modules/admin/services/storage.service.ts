import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ReporteCargaExitosaComponent } from '../components/reporte-carga-exitosa/reporte-carga-exitosa.component';
import { ReportePilotoComponent } from '../components/reporte-piloto/reporte-piloto.component';
import { FileUpload } from '../models/fileUpload';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private basePath = '/uploads';
  public ruta: string;
  
  itemsFrontal = [];
  itemsIzquierda = [];
  itemsDerecha = [];
  itemsPosterior = [];

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload, posicion: string): Observable<number> {
    this.itemsFrontal = [];
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {

          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);

          this.ruta = downloadURL;            

          if(posicion == "frontal") {
            this.itemsFrontal.push(downloadURL)
          } else if( posicion == "izquierda") {
            this.itemsIzquierda.push(downloadURL)
          } else if( posicion == "derecha") {
            this.itemsDerecha.push(downloadURL)
          } else if( posicion == "posterior") {
            this.itemsPosterior.push(downloadURL)
          }


        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  getFotoFrontal() {
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
  }


  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
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
