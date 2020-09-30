import { Injectable } from '@angular/core';

import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUpload } from '../models/fileupload.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private basePathVideos = 'Pedidos';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePathVideos);
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key, fileUpload.cliente);
      
  }

  private deleteFileDatabase(key: string, nombre: string){
    return this.db.list(this.basePathVideos).remove(key);
  }
}
