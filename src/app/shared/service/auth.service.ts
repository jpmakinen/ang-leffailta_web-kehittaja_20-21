// Apuna servicen teossa käytetty Tommi Tuikan tutoriaaleja ja Google Firebase dokumentaatiota.

import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  isLoggedIn: boolean;

  constructor(
    public angfires: AngularFirestore,
    public angfireauth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.isLoggedIn = false;
  }

  // Autentikaatio logiikka Google-kirjautumista varten
  AuthLogin(provider: any) {
    return this.angfireauth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.isLoggedIn = true;
          this.router.navigate(['list-review']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Googlen tunnuksilla kirjautuminen
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Sisäänkirjautuminen tunnuksilla
  signIn(email: string, password: string) {
    return this.angfireauth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.isLoggedIn = true;

          this.router.navigate(['list-review']);
        });
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }

  // Rekisteröinti tunnuksia käyttäen
  signUp(email: string, password: string) {
    return this.angfireauth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.router.navigate(['list-review']);
        this.isLoggedIn = true;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Kirjaudutaan ulos
  signOut() {
    return this.angfireauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.router.navigate(['sign-in']);
    });
  }
}
