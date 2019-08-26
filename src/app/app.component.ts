import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
  
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      class: 'user_student'
    },
    {
      title: 'Home',
      url: '/home_admin',
      icon: 'home',
      class: 'user_admin'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person',
      class: 'user_student user_admin user_cps user_pbs user_gc'
    },
    {
      title: 'Register User',
      url: '/register',
      icon: 'person-add',
      class: 'user_admin'
    },
    {
      title: 'Users :',
      icon: 'people',
      class: 'user_admin'
    
    },
    {
      title: 'Admin',
      url: '/users_admin',
      style: 'padding-left: 10px;',
      class: 'user_admin'
    
    },
    {
      title: 'PB Supervisor',
      url: '/users_pbs',
      style: 'padding-left: 10px;',
      class: 'user_admin'
    
    },
    {
      title: 'Company Supervisor',
      url: '/users_cps',
      style: 'padding-left: 10px;',
      class: 'user_admin'
    
    },
    {
      title: 'Internship Student',
      url: '/users_student',
      style: 'padding-left: 10px;',
      class: 'user_admin'
    
    },
    {
      title: 'Uploaded Task',
      icon: 'clipboard',
      url: '/dailytask',
      class: 'user_admin user_cps user_pbs user_gc'
    
    },
    {
      title: 'Attendance Report',
      icon: 'calendar',
      url: '/attendance_report',
      class: 'user_admin user_cps user_pbs user_gc'
    },
    {
    title: 'Upload Task',
    url: '/uploadtask',
    icon: 'clipboard',
    class: 'user_student'
  },
  {
    title: 'Attendance',
    url: '/attendance',
    icon: 'calendar',
    class: 'user_student'
  },
  {
    title: 'Notification',
    url: '/notification',
    icon: 'notifications',
    class: 'user_student'

  },
  {
    title: 'Setting',
    url: '/setting',
    icon: 'settings',
    class: 'user_student'
  },
  {
    title: 'Logout',
    url: '/login',
    icon: 'log-out'

  }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
