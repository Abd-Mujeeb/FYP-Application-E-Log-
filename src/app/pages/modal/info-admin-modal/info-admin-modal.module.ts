import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoAdminModalPage } from './info-admin-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAdminModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoAdminModalPage]
})
export class InfoAdminModalPageModule {}
