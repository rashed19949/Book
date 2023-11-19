import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const localUser: any = localStorage.getItem('user');
    const user = JSON.parse(localUser);
    console.log(user);

    if (!user) {
      return true;
    }

    if (user?.role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']).then();
    }

    if (user?.role === 'CUSTOMER') {
      this.router.navigate(['/public/dashboard']).then();
    }


    return false;
  }


}
