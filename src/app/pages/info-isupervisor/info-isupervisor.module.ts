import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoIsupervisorPage } from './info-isupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: InfoIsupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoIsupervisorPage]
})
export class InfoIsupervisorPageModule {}
