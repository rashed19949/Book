import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private fs: Firestore, private auth: Auth) {
  }

  signin(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signup(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  forget(email: string): Observable<any> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  logout() {
    signOut(this.auth)
    localStorage.removeItem('user')
  }

}
