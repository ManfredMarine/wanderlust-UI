import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../library/shared-components/shared-components.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    HomePageComponent,
    MyBookingsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class PagesModule { }
