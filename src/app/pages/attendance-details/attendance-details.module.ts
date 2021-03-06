import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AttendanceDetailsPage } from './attendance-details.page';
import { AttendancedetailsResolver } from './attendance-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: AttendanceDetailsPage,
    resolve: {
      data: AttendancedetailsResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AttendanceDetailsPage],
  providers: [
    AttendancedetailsResolver
  ]
})
export class AttendanceDetailsPageModule {}
