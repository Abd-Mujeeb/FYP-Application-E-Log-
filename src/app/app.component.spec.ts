import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
      ],
      imports: [ RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });



  it('should have menu labels', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(16);
    expect(menuItems[0].textContent).toContain('Home');
    expect(menuItems[1].textContent).toContain('Home');
    expect(menuItems[2].textContent).toContain('Profile');
    expect(menuItems[3].textContent).toContain('Register User');
    expect(menuItems[4].textContent).toContain('Users :');
    expect(menuItems[5].textContent).toContain('Admin');
    expect(menuItems[6].textContent).toContain('PB Supervisor');
    expect(menuItems[7].textContent).toContain('Company Supervisor');
    expect(menuItems[8].textContent).toContain('Internship Student');
    expect(menuItems[9].textContent).toContain('Uploaded Task');
    expect(menuItems[10].textContent).toContain('Attendance Report');
    expect(menuItems[11].textContent).toContain('Upload Task');
    expect(menuItems[12].textContent).toContain('Attendance');
    expect(menuItems[13].textContent).toContain('Notification');
    expect(menuItems[14].textContent).toContain('Setting');
    expect(menuItems[15].textContent).toContain('Logout');
  });

  it('should have urls', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(15);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/home');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/home_admin');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/profile');
    expect(menuItems[3].getAttribute('ng-reflect-router-link')).toEqual('/register');
    expect(menuItems[4].getAttribute('ng-reflect-router-link')).toEqual('/users_admin');
    expect(menuItems[5].getAttribute('ng-reflect-router-link')).toEqual('/users_pbs');
    expect(menuItems[6].getAttribute('ng-reflect-router-link')).toEqual('/users_cps');
    expect(menuItems[7].getAttribute('ng-reflect-router-link')).toEqual('/users_student');
    expect(menuItems[8].getAttribute('ng-reflect-router-link')).toEqual('/dailytask');
    expect(menuItems[9].getAttribute('ng-reflect-router-link')).toEqual('/attendance_report');
    expect(menuItems[10].getAttribute('ng-reflect-router-link')).toEqual('/uploadtask');
    expect(menuItems[11].getAttribute('ng-reflect-router-link')).toEqual('/attendance');
    expect(menuItems[12].getAttribute('ng-reflect-router-link')).toEqual('/notification');
    expect(menuItems[13].getAttribute('ng-reflect-router-link')).toEqual('/setting');
    expect(menuItems[14].getAttribute('ng-reflect-router-link')).toEqual('/login');
  });

    // TODO: add more tests!
});
