import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AttendanceViewPage } from './attendance-view.page';
import { AttendanceResolver } from './attendance-view.resolver';

const routes: Routes = [
  {
    path: '',
    component: AttendanceViewPage,
    resolve: {
      data: AttendanceResolver
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
  declarations: [AttendanceViewPage],
  providers:[AttendanceResolver]
})
export class AttendanceViewPageModule {}
