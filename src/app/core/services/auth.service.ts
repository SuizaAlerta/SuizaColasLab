import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as firebase from "firebase/app";
import 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new Observable<User>();
  public redirectUrl: string = null;

  // flags
  public hasAccess: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private AfAuthModule: AngularFireAuthModule,
    private afs: AngularFirestore,
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          // alert("si hay usuario");
          this.redirectUrl = null;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // alert("nulo en obs");
          // console.log("nulo");
          return of(null);
        }
      })
    );
  }

  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return this.afAuth.signInWithEmailAndPassword(email, password);
        })
        .then((userData) => {
          //console.log("login method: ", userData);
          resolve(userData);
        }, err => { reject(err) });
    });
  }

  logoutUser() {
    // console.log("deslogueando al usuario!");
    this.hasAccess = false;
    this.afAuth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  checkAutorization(user: User, role: string): boolean {
    // TODO: completar
    return true;
  }
}
