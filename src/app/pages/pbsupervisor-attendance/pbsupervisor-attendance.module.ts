import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PbsupervisorAttendancePage } from './pbsupervisor-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: PbsupervisorAttendancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PbsupervisorAttendancePage]
})
export class PbsupervisorAttendancePageModule {}
