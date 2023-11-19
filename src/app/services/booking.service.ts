import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { CollectionReference, DocumentData, DocumentSnapshot, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore'
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  readonly _updateRecordBooking = new BehaviorSubject<any>(null);
  readonly updateRecordBooking$ = this._updateRecordBooking.asObservable();
  constructor(private fs: Firestore, private afs: AngularFirestore) { }

  createBooking(params: any): Observable<any> {
    const ref: CollectionReference<DocumentData> = collection(this.fs, 'bookings');
    return from(addDoc(ref, params));
  }

  

  getBookingById(id: any): Observable<any> {
    const bookingsRef = collection(this.fs, 'bookings');
    const queryRef = query(bookingsRef, where('userUid', '==', id));
    return from(getDocs(queryRef)).pipe(
      map((querySnapshot: any) => {
        const data = querySnapshot.docs.map((doc: any) => ({ uid: doc.id, ...doc.data() }));
        return data
      })
    );
  }

  getBookings(): Observable<any> {
    const ref = collection(this.fs, 'bookings');
    return from(getDocs(ref)).pipe(
      map((querySnapshot: any) => {
        const data = querySnapshot.docs.map((doc: any) => ({ uid: doc.id, ...doc.data() }));
        return data
      })
    );
  }

  updateBooking(params: any, id: any): Observable<any> {
    const docRef: AngularFirestoreDocument<DocumentData> = this.afs.collection('bookings').doc(id);
    const docReference: DocumentReference<DocumentData> = docRef.ref;

    return from(updateDoc(docReference, params));
  }
  deleteBooking(id: any): Observable<any> {
    const companyDoc = doc(this.fs, 'bookings', id);
    return from(deleteDoc(companyDoc));
  }
}
