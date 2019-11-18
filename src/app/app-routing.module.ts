import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
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
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'first-login-password', loadChildren: '././first-login-password/first-login-password.module#FirstLoginPasswordPageModule' },

  {
    path: 'info-admin',
    loadChildren: './pages/info-admin/info-admin.module#InfoAdminPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'profile-pbsupervisor',
    loadChildren: './pages/profile-pbsupervisor/profile-pbsupervisor.module#ProfilePbsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'pbsupervisor'
    }
  },

  {
    path: 'profile-admin',
    loadChildren: './pages/profile-admin/profile-admin.module#ProfileAdminPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'profile-gc',
    loadChildren: './pages/profile-gc/profile-gc.module#ProfileGcPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'gc'
    }
  },

  {
    path: 'profile-student',
    loadChildren: './pages/profile-student/profile-student.module#ProfileStudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'home-admin',
    loadChildren: './pages/home-admin/home-admin.module#HomeAdminPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'home-gc',
    loadChildren: './pages/home-gc/home-gc.module#HomeGcPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'gc'
    }
  },

  {
    path: 'home-student',
    loadChildren: './pages/home-student/home-student.module#HomeStudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'home-pbsupervisor',
    loadChildren: './pages/home-pbsupervisor/home-pbsupervisor.module#HomePbsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'pbsupervisor'
    }
  },

  {
    path: 'info-gc',
    loadChildren: './pages/info-gc/info-gc.module#InfoGcPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'info-pbsupervisor',
    loadChildren: './pages/info-pbsupervisor/info-pbsupervisor.module#InfoPbsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'info-student', loadChildren: './pages/info-student/info-student.module#InfoStudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'info-student/:id', loadChildren: './pages/info-student/info-student.module#InfoStudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'attendance',
    loadChildren: './pages/attendance/attendance.module#AttendancePageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'dailytask',
    loadChildren: './pages/dailytask/dailytask.module#DailytaskPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'details',
    loadChildren: './pages/details/details.module#DetailsPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'details/:id',
    loadChildren: './pages/details/details.module#DetailsPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'new-task',
    loadChildren: './pages/new-task/new-task.module#NewTaskPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'themes-page',
    loadChildren: './pages/themes-page/themes-page.module#ThemesPagePageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'uploadtask',
    loadChildren: './pages/uploadtask/uploadtask.module#UploadtaskPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'notification',
    loadChildren: './pages/notification/notification.module#NotificationPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },

  {
    path: 'info-isupervisor',
    loadChildren: './pages/info-isupervisor/info-isupervisor.module#InfoIsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },

  {
    path: 'profile-isupervisor',
    loadChildren: './pages/profile-isupervisor/profile-isupervisor.module#ProfileIsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'isupervisor'
    }
  },

  {
    path: 'home-isupervisor',
    loadChildren: './pages/home-isupervisor/home-isupervisor.module#HomeIsupervisorPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'isupervisor'
    }
  },
  {
    path: 'attendance-details', loadChildren: './pages/attendance-details/attendance-details.module#AttendanceDetailsPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },
  {
    path: 'attendance-view', loadChildren: './pages/attendance-view/attendance-view.module#AttendanceViewPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },
  {
    path: 'attendance-view/:id', loadChildren: './pages/attendance-view/attendance-view.module#AttendanceViewPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },
  { path: 'course', loadChildren: './pages/course/course.module#CoursePageModule' },
  { path: 'group-code', loadChildren: './pages/group-code/group-code.module#GroupCodePageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'admin'
  } },

  {
    path: 'student-task', loadChildren: './pages/student-task/student-task.module#StudentTaskPageModule',},
  { path: 'student-attendance', loadChildren: './pages/student-attendance/student-attendance.module#StudentAttendancePageModule' },

  {
    path: 'i-student-list', loadChildren: './pages/i-student-list/i-student-list.module#IStudentListPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'isupervisor'
    }
  },
  {
    path: 'info-gcstudent', loadChildren: './pages/info-gcstudent/info-gcstudent.module#InfoGcstudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'gc'
    }
  },
  {
    path: 'attendance-gcstudent', loadChildren: './pages/attendance-gcstudent/attendance-gcstudent.module#AttendanceGcstudentPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'gc'
    }
  },
  {
    path: 'attendance-timeout/:id', loadChildren: './pages/attendance-timeout/attendance-timeout.module#AttendanceTimeoutPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'student'
    }
  },
  { path: 'pbsupervisor-attendance', loadChildren: './pages/pbsupervisor-attendance/pbsupervisor-attendance.module#PbsupervisorAttendancePageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'pbsupervisor'
  }
 },

  { path: 'pbsupervisor-choose', loadChildren: './pages/pbsupervisor-choose/pbsupervisor-choose.module#PbsupervisorChoosePageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'pbsupervisor'
  }
 },
  { path: 'i-student-attendance', loadChildren: './pages/i-student-attendance/i-student-attendance.module#IStudentAttendancePageModule',
  canActivate: [AuthGuard],
  data: {
    role: 'isupervisor'
  }
},
  { path: 'changepw-admin', loadChildren: './pages/changepw-admin/changepw-admin.module#ChangepwAdminPageModule' },
  { path: 'changepw-pb', loadChildren: './pages/changepw-pb/changepw-pb.module#ChangepwPbPageModule' },
  { path: 'changepw-i', loadChildren: './pages/changepw-i/changepw-i.module#ChangepwIPageModule' },
  { path: 'changepw-gc', loadChildren: './pages/changepw-gc/changepw-gc.module#ChangepwGcPageModule' },
  { path: 'changepw-student', loadChildren: './pages/changepw-student/changepw-student.module#ChangepwStudentPageModule' },
  { path: 'image-modal', loadChildren: './pages/image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'register-pbsupervisor', loadChildren: './pages/register-pbsupervisor/register-pbsupervisor.module#RegisterPbsupervisorPageModule' },
  { path: 'register-gc', loadChildren: './pages/register-gc/register-gc.module#RegisterGcPageModule' },
  { path: 'editpbsupervisor-modal', loadChildren: './pages/editpbsupervisor-modal/editpbsupervisor-modal.module#EditpbsupervisorModalPageModule' },
  { path: 'pb-studentlist', loadChildren: './pages/pb-studentlist/pb-studentlist.module#PbStudentlistPageModule' },
  { path: 'select-student', loadChildren: './pages/select-student/select-student.module#SelectStudentPageModule' },
  { path: 'selectstudent-modal', loadChildren: './pages/selectstudent-modal/selectstudent-modal.module#SelectstudentModalPageModule' },
  { path: 'register-admin', loadChildren: './pages/register-admin/register-admin.module#RegisterAdminPageModule' },
  { path: 'pb-studentlist-modal', loadChildren: './pages/pb-studentlist-modal/pb-studentlist-modal.module#PbStudentlistModalPageModule' },
  { path: 'info-admin-modal', loadChildren: './pages/modal/info-admin-modal/info-admin-modal.module#InfoAdminModalPageModule' },
  { path: 'change', loadChildren: './pages/change/change.module#ChangePageModule' },
  { path: 'gc-studentlist-modal', loadChildren: './pages/gc-studentlist-modal/gc-studentlist-modal.module#GcStudentlistModalPageModule' },
  { path: 'change', loadChildren: './pages/change/change.module#ChangePageModule' },
  { path: 'info-gc-modal', loadChildren: './pages/modal/info-gc-modal/info-gc-modal.module#InfoGcModalPageModule' },
  { path: 'splash', loadChildren: './pages/splash/splash.module#SplashPageModule' },
  { path: 'select-date', loadChildren: './pages/select-date/select-date.module#SelectDatePageModule' },
  { path: 'student-attendance-pbsupervisor', loadChildren: './pages/student-attendance-pbsupervisor/student-attendance-pbsupervisor.module#StudentAttendancePbsupervisorPageModule' },  { path: 'gc-student', loadChildren: './pages/gc-student/gc-student.module#GcStudentPageModule' },
























];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
