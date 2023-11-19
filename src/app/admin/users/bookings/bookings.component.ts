import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss', '../../admin.component.scss']
})
export class BookingsComponent implements OnInit {
  bookingList: any = [];
  user_id: any;

  constructor(
    private route: ActivatedRoute,
    private booking_service: BookingService
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.user_id = params['id'];
      if (this.user_id) {
        this.getUserBookings(this.user_id);
      }
    });
  }

  getUserBookings(id: any): void {
    this.booking_service
      .getBookingById(id)
      .subscribe(
        (response: any) => {
          this.bookingList = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
