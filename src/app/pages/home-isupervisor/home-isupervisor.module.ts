import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeIsupervisorPage } from './home-isupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: HomeIsupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeIsupervisorPage]
})
export class HomeIsupervisorPageModule {}
