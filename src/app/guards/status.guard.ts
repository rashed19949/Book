import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const localUser: any = localStorage.getItem('user');
    const user = JSON.parse(localUser);

    if (user?.role === 'CUSTOMER' && user?.status === 'ENABLED') {
      return true;
    }

    this.router.navigate(['/public/dashboard/bookings']);
    return false;
  }

}
