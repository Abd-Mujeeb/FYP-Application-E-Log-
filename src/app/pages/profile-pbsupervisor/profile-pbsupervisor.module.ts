import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePbsupervisorPage } from './profile-pbsupervisor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePbsupervisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePbsupervisorPage]
})
export class ProfilePbsupervisorPageModule {}
