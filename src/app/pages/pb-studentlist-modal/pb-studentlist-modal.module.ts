import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PbStudentlistModalPage } from './pb-studentlist-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PbStudentlistModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PbStudentlistModalPage]
})
export class PbStudentlistModalPageModule {}
