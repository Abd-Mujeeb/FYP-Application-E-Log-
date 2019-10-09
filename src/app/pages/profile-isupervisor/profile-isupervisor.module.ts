import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileIsupervisorPage } from './profile-isupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileIsupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileIsupervisorPage]
})
export class ProfileIsupervisorPageModule {}
