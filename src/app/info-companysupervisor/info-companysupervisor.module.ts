import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoCompanysupervisorPage } from './info-companysupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: InfoCompanysupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoCompanysupervisorPage]
})
export class InfoCompanysupervisorPageModule {}
