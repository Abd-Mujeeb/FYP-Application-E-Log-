import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeStudentPage } from './home-student.page';
import { HomestudentResolver } from './home-student.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeStudentPage,
    resolve: {
      data: HomestudentResolver
    }
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
  declarations: [HomeStudentPage],
  providers: [
    HomestudentResolver
  ]
})
export class HomeStudentPageModule {}
