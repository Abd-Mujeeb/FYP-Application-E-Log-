import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule' },
  // { path: 'uploadtask', loadChildren: './uploadtask/uploadtask.module#UploadtaskPageModule' },
  // { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  // { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  // { path: 'attendance', loadChildren: './attendance/attendance.module#AttendancePageModule' },
  // { path: 'new-task', loadChildren: './new-task/new-task.module#NewTaskPageModule' },
  // { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' },
  // { path: 'themes-page', loadChildren: './themes-page/themes-page.module#ThemesPagePageModule' }
  
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },

  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule',},
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },


  { path: 'info-admin', 
    loadChildren: './pages/info-admin/info-admin.module#InfoAdminPageModule', 
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }},

  { path: 'profile-pbsupervisor', 
    loadChildren: './pages/profile-pbsupervisor/profile-pbsupervisor.module#ProfilePbsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'pbsupervisor'
    } },

  { path: 'profile-admin', 
    loadChildren: './pages/profile-admin/profile-admin.module#ProfileAdminPageModule',
    canActivate: [AuthGuard],
    data: {
    role: 'admin'
  } },

  { path: 'profile-gc', 
    loadChildren: './pages/profile-gc/profile-gc.module#ProfileGcPageModule',
    canActivate: [AuthGuard],
    data: {
    role: 'gc'
  } },

  { path: 'profile-student', 
    loadChildren: './pages/profile-student/profile-student.module#ProfileStudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    } },
 
  { path: 'home-admin', 
    loadChildren: './pages/home-admin/home-admin.module#HomeAdminPageModule',
    canActivate: [AuthGuard],
    data: {
    role: 'admin'
    }},

  { path: 'home-gc', 
    loadChildren: './pages/home-gc/home-gc.module#HomeGcPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'gc'
    } },

  { path: 'home-student', 
    loadChildren: './pages/home-student/home-student.module#HomeStudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    } },

  { path: 'home-pbsupervisor', 
    loadChildren: './pages/home-pbsupervisor/home-pbsupervisor.module#HomePbsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'pbsupervisor'
    } },

  { path: 'info-gc', 
    loadChildren: './pages/info-gc/info-gc.module#InfoGcPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
 },

  { path: 'info-pbsupervisor', 
  loadChildren: './pages/info-pbsupervisor/info-pbsupervisor.module#InfoPbsupervisorPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'admin'
  } },

  { path: 'info-student', loadChildren: './pages/info-student/info-student.module#InfoStudentPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'admin'
  } },

  { path: 'attendance', 
  loadChildren: './pages/attendance/attendance.module#AttendancePageModule',
  canActivate: [AuthGuard],
  data: {
  role: 'student'
  }  },

  { path: 'dailytask', 
  loadChildren: './pages/dailytask/dailytask.module#DailytaskPageModule',
  canActivate: [AuthGuard],
  data: {
  role: 'student'
  }  },

  { path: 'details', 
  loadChildren: './pages/details/details.module#DetailsPageModule',
  canActivate: [AuthGuard],
  data: {
  role: 'student'
  }  },

  { path: 'details/:id', 
  loadChildren: './pages/details/details.module#DetailsPageModule',
  canActivate: [AuthGuard],
  data: {
  role: 'student'
  }  },
  
  { path: 'new-task', 
  loadChildren: './pages/new-task/new-task.module#NewTaskPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'student'
    } },

  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'student'
    } },

  { path: 'themes-page', 
  loadChildren: './pages/themes-page/themes-page.module#ThemesPagePageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'student'
    }  },

  { path: 'uploadtask', 
  loadChildren: './pages/uploadtask/uploadtask.module#UploadtaskPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'student'
    }  },

  { path: 'notification', 
  loadChildren: './pages/notification/notification.module#NotificationPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'student'
    }  },

  { path: 'info-isupervisor', 
  loadChildren: './pages/info-isupervisor/info-isupervisor.module#InfoIsupervisorPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'admin'
    }  
},

  { path: 'profile-isupervisor', 
  loadChildren: './pages/profile-isupervisor/profile-isupervisor.module#ProfileIsupervisorPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'isupervisor'
    }   },

  { path: 'home-isupervisor', 
  loadChildren: './pages/home-isupervisor/home-isupervisor.module#HomeIsupervisorPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'isupervisor'
    }   },
  { path: 'attendance-details', loadChildren: './pages/attendance-details/attendance-details.module#AttendanceDetailsPageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'student'
    } 
 },



  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
