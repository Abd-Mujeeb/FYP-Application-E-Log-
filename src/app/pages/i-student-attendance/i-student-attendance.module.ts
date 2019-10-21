import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IStudentAttendancePage } from './i-student-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: IStudentAttendancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IStudentAttendancePage]
})
export class IStudentAttendancePageModule {}
