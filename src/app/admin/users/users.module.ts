import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModule } from 'src/app/demo-material-module';



@NgModule({
  declarations: [
    UsersListComponent,
    BookingsComponent,
   

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule
    
  ]
})
export class UsersModule {
  static routes: Routes | undefined;

}
