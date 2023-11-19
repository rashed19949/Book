import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { StatusGuard } from '../guards/status.guard';



const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashbaordComponent,
    children: [
      { path: '', redirectTo: 'bookings', pathMatch: 'full' },
      { path: 'bookings', component: UserDashboardComponent },
      { path: 'addbooking', component: AddBookingComponent, canActivate: [StatusGuard] },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
