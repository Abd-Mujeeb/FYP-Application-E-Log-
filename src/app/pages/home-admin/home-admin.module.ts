import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { IonicModule } from '@ionic/angular';

import { HomeAdminPage } from './home-admin.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShowHidePasswordModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeAdminPage]
})
export class HomeAdminPageModule {}
