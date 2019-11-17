import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentAttendancePbsupervisorPage } from './student-attendance-pbsupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: StudentAttendancePbsupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentAttendancePbsupervisorPage]
})
export class StudentAttendancePbsupervisorPageModule {}
