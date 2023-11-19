import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';

import { BehaviorSubject, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: Firestore) { }

  readonly _isSideBarOpen = new BehaviorSubject<any>(null);
  readonly isSideBarOpen$ = this._isSideBarOpen.asObservable();
  
  addUser(user: any): Observable<any> {
    const ref = doc(this.fs, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  getUser(uid: string): Observable<any> {
    const ref = doc(this.fs, 'users', uid);
    return from(getDoc(ref)).pipe(
      map((snapshot: any) => {
        if (snapshot.exists()) {
          return { uid: snapshot.id, ...snapshot.data() };
        } else {
          return null;
        }
      })
    );
  }

  getUsers(): Observable<any> {
    const ref = collection(this.fs, 'users');
    const q = query(ref,
      where('role', '!=', 'ADMIN'),
      where('status', '==', 'ENABLED'));
    return from(getDocs(q)).pipe(
      map((querySnapshot: any) => {
        const data = querySnapshot.docs.map((doc: any) => ({ uid: doc.id, ...doc.data() }));
        return data
      })
    );
  }

  getAdminUser(): Observable<any> {
    const ref = collection(this.fs, 'users');
    const q = query(ref, where('role', '==', 'ADMIN'));
    return from(getDocs(q)).pipe(
      map((querySnapshot: any) => {
        const data = querySnapshot.docs.map((doc: any) => ({ uid: doc.id, ...doc.data() }));
        return data[0]
      })
    );
  }

  deleteUser(id: any): Observable<any> {
    const companyDoc = doc(this.fs, 'users', id);
    return from(deleteDoc(companyDoc));
  }

  disableUser(uid: any): Observable<any> {
    const userRef = doc(this.fs, 'users', uid);
    const update = { status: 'DISABLED' };
    return from(updateDoc(userRef, update));
  }

}
