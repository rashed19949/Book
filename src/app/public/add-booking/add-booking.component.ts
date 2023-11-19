import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss', '../../admin/admin.component.scss']
})
export class AddBookingComponent implements OnInit , OnDestroy{

  currentDate: any;
  threeWeeksFromToday: any;
  minDate: any;
  maxDate: any;
  updatedRecord:any={ }
  bookingForm!: FormGroup;
  user: any;
  timeInPast = false;
  bookingCatogries:any[]=["1 Days","2 Days","3 Days","5 Days"]

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('user');
    this.user = JSON.parse(data);
    this.currentDate = new Date();
    this.threeWeeksFromToday = new Date(this.currentDate);
    this.threeWeeksFromToday.setDate(this.threeWeeksFromToday.getDate() + 21);
    this.minDate = new Date(this.currentDate).toISOString().split('T')[0];
    this.maxDate = new Date(this.threeWeeksFromToday).toISOString().split('T')[0];

    this.bookingForm = this.formBuilder.group({
      fromDate: ['', [Validators.required, this.dateFormatValidator()]],
      fromTime: ['', [Validators.required]],
      toDate: ['', [Validators.required, this.dateFormatValidator()]],
      toTime: ['', [Validators.required]],
      bookingCatogries: ['', [Validators.required]],
      price: ['', [Validators.required]],
      availability: ['', [Validators.required]],
      userUid: [this.user?.uid],
      userName: [this.user?.displayName],
      userEmail: [this.user?.email],
    });
    this.updatedRecord = this.bookingService._updateRecordBooking.getValue();
    if(this.updatedRecord){
      this.bookingForm.patchValue(this.updatedRecord);
    }

  }
  dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputValue = control?.value;
      if (isNaN(Date?.parse(inputValue))) {
        return { 'invalidDateFormat': true };
      }
      const formattedDate = new Date(inputValue)?.toISOString()?.split('T')[0];
      if (formattedDate && formattedDate !== control?.value) {
        control?.setValue(formattedDate);
      }
      return null;
    };
  }
  
  
  TimeInPast(): void {
    this.bookingForm.value.fromTime;
    const currentDate = new Date();
    const selectedDate = new Date(this.bookingForm.get('fromDate')?.value);
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      const currentTime = new Date();
      const selectedTime = this.bookingForm.get('fromTime')?.value.split(':');
      if ((+selectedTime[0] > currentTime.getHours()) || (+selectedTime[0] === currentTime.getHours() && +selectedTime[1] >= currentTime.getMinutes())) {
        this.timeInPast = false
      }
      else {
        this.timeInPast = true
      }

    }

  }

  // Check() {
  //   if (this.bookingForm.value.fromDate > this.bookingForm.value.toDate) {
  //     this.bookingForm?.get('toDate')?.setValue('');
  //   }
  // }

  addBooking() {
    const toTimeString = this.bookingForm.value.fromTime;
    this.bookingForm.value.fromTime =toTimeString.replace(/\s?[APMapm]{2}$/g, '');
    const fromTimeString = this.bookingForm.value.toTime;
    this.bookingForm.value.toTime =fromTimeString.replace(/\s?[APMapm]{2}$/g, '');
    console.log('this.bookingForm.value: ', this.bookingForm.value);
    if (this.bookingForm.valid) {
      if(this.updatedRecord){

        this.bookingService.updateBooking(this.bookingForm.value,this.updatedRecord.uid)
        .subscribe((res) => {
          console.log('res: ', res);
          this.router.navigateByUrl('/public/dashboard/bookings');
        }),
        (err: any) => {
          console.log(err);
        }
      }
      else{
        this.bookingService.createBooking(this.bookingForm.value, )
        .subscribe((res) => {
          this.router.navigateByUrl('/public/dashboard/bookings');
        }),
        (err: any) => {
          console.log(err);
        }
      }
   
    }
    else {
      this.bookingForm.markAllAsTouched();
    }
  }
  ngOnDestroy(){
    this.bookingService._updateRecordBooking.next(null);
  }
}
