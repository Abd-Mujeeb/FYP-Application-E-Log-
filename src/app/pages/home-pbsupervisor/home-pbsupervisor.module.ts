import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePbsupervisorPage } from './home-pbsupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: HomePbsupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePbsupervisorPage]
})
export class HomePbsupervisorPageModule {}
