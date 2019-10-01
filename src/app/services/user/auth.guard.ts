import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService
    ) {}

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = route.data.role;

    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.router.navigateByUrl('/login');
          return false;
        } else {
          let role = user['role'];
          if (expectedRole == role) {
            return true;
          } else {
            this.router.navigateByUrl('/login');
            return false;
          }
        }
      })
    )
  }
}
