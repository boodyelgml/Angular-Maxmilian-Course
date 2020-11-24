import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.services';
import { Observable, Subscription } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable, OnDestroy, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class authGuard implements CanActivate {
  isAuth: boolean;
  subs: Subscription;

  constructor(private AuthService: AuthService, private router: Router) { }



  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> | UrlTree {

    if (this.AuthService.user.value) {
      return true;
    }
    return this.router.createUrlTree(['/auth']);
  }


}
