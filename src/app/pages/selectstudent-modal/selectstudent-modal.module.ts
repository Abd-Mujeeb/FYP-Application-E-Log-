import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectstudentModalPage } from './selectstudent-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SelectstudentModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectstudentModalPage]
})
export class SelectstudentModalPageModule {}
