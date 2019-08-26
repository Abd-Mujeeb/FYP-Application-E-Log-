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
  { path: 'home-admin', loadChildren: './home-admin/home-admin.module#HomeAdminPageModule' },
  { path: 'users-pbs', loadChildren: './users-pbs/users-pbs.module#UsersPbsPageModule' },
  { path: 'users-cps', loadChildren: './users-cps/users-cps.module#UsersCpsPageModule' },
  { path: 'users-gc', loadChildren: './users-gc/users-gc.module#UsersGcPageModule' },
  { path: 'users-student', loadChildren: './users-student/users-student.module#UsersStudentPageModule' },
  { path: 'attendance-report', loadChildren: './attendance-report/attendance-report.module#AttendanceReportPageModule' },
  { path: 'users-admin', loadChildren: './users-admin/users-admin.module#UsersAdminPageModule' },
  { path: 'dailytask', loadChildren: './dailytask/dailytask.module#DailytaskPageModule' },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
