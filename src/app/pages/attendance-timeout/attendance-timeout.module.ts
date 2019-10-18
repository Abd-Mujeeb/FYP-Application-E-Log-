import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AttendanceTimeoutPage } from './attendance-timeout.page';
import { AttendancetimeoutResolver } from './attendance-timeout.resolver'

const routes: Routes = [
  {
    path: '',
    component: AttendanceTimeoutPage,
    resolve: {
      data: AttendancetimeoutResolver 
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AttendanceTimeoutPage],
  providers: [AttendancetimeoutResolver]
})
export class AttendanceTimeoutPageModule {}
