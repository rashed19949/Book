import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './admin-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AuthDashboardComponent } from './auth-dashboard/auth-dashboard.component';
import { MaterialModule } from '../demo-material-module';


@NgModule({
  declarations: [
    SideNavComponent,
    HeaderComponent,
    AuthDashboardComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,


  ]
})
export class AdminModule { }
