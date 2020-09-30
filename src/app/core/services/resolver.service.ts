import { Injectable } from '@angular/core';
import { Roles } from 'src/app/core/models/roles.model';
import { of, Observable } from 'rxjs';
import { mergeMap, take, catchError } from 'rxjs/operators';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.authService.user$.pipe(take(1));
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }
}
