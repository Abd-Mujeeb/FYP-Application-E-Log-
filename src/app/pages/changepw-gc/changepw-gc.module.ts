import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangepwGcPage } from './changepw-gc.page';

const routes: Routes = [
  {
    path: '',
    component: ChangepwGcPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangepwGcPage]
})
export class ChangepwGcPageModule {}
