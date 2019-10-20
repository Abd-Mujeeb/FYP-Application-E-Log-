import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PbsupervisorChoosePage } from './pbsupervisor-choose.page';

const routes: Routes = [
  {
    path: '',
    component: PbsupervisorChoosePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PbsupervisorChoosePage]
})
export class PbsupervisorChoosePageModule {}
