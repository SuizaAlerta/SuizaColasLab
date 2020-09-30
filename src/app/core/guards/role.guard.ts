import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { isEmpty, intersection } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRoles = route.data.expectedRoles as Array<string>;
    this.authService.redirectUrl = route.path;
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        let hasRole = false;
        // verificar si el usuario existe
        if (!!user) {
          // console.log("si hay usuario");
          // verificar si tiene el rol necesario para el acceso
          hasRole = this.hasMatchingRole(expectedRoles, user.roles);
          // console.log("rol:", hasRole);
          if (hasRole) {
            // console.log("si hay rol");
          } else {
            alert("Acceso restringido!");
            console.log("no hay rol necesario / acceso restringido");
            this.authService.redirectUrl = null;
          }
        } else {
          // console.log("no había usuario");
          this.authService.hasAccess = false;
        }
        this.authService.hasAccess = user && hasRole;
        let hasAccess = user && hasRole;
        // console.log("map: ", hasAccess);
        return hasAccess;
      }),
      tap(hasAccess => {
        if (!hasAccess) {
          // logout user and send back to login
          // alert("tap after!");
          // console.log("tap:", hasAccess);
          this.onLogout();
          this.router.navigate(['login']);
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const expectedRoles = route.data.expectedRoles as Array<string>;
    // console.log("expectedRoles:", expectedRoles);
    return this.authService.user$.pipe(
      take(1),
      map((user) => user && this.hasMatchingRole(expectedRoles, user.roles)),
      tap(hasRole => {
        if (!hasRole) {
          // logout user and send back to login
          // console.log("acceso denegado - can activate guard");
          this.onLogout();
          this.router.navigate(['login']);
        }
      })
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const expectedRoles = childRoute.data.expectedRoles as Array<string>;
    // console.log("can activate child");
    // console.log("expectedRoles:", expectedRoles);
    // console.log(childRoute.url.join('/'));
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        // console.log("CAn:", user);
        // console.log("CAn:", this.hasMatchingRole(expectedRoles, user.roles))
        return user && this.hasMatchingRole(expectedRoles, user.roles)
      }),
      tap(hasRole => {
        if (!hasRole) {
          // logout user and send back to login
          // console.log("can activated child deslogueo!");
          this.onLogout();
          this.router.navigate(['login']);
        }
      })
    );

  }

  hasMatchingRole(expectedRoles, userRoles): boolean {
    return !isEmpty(intersection(expectedRoles, Object.keys(userRoles)));
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
