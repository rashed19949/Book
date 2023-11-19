import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { MaterialModule } from '../demo-material-module';
import { TableModule } from 'smart-webcomponents-angular/table';
import { TimePickerModule } from 'smart-webcomponents-angular/timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
@NgModule({
  declarations: [
    DashbaordComponent,
    HeaderComponent,
    SideNavComponent,
    UserDashboardComponent,
    AddBookingComponent
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbCarouselModule,
    NgIf,
    MaterialModule,
    TimePickerModule,
    NgxMaterialTimepickerModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicModule { }
