import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AttendanceGcstudentPage } from './attendance-gcstudent.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceGcstudentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AttendanceGcstudentPage]
})
export class AttendanceGcstudentPageModule {}
