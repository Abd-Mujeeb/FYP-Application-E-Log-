import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'uploadtask', loadChildren: './uploadtask/uploadtask.module#UploadtaskPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'attendance', loadChildren: './attendance/attendance.module#AttendancePageModule' },
  { path: 'info-admin', loadChildren: './info-admin/info-admin.module#InfoAdminPageModule' },
  { path: 'info-pbsupervisor', loadChildren: './info-pbsupervisor/info-pbsupervisor.module#InfoPbsupervisorPageModule' },
  { path: 'info-companysupervisor', loadChildren: './info-companysupervisor/info-companysupervisor.module#InfoCompanysupervisorPageModule' },
  { path: 'info-gc', loadChildren: './info-gc/info-gc.module#InfoGcPageModule' },
  { path: 'info-students', loadChildren: './info-students/info-students.module#InfoStudentsPageModule' },
  { path: 'new-task', loadChildren: './new-task/new-task.module#NewTaskPageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' }


  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
