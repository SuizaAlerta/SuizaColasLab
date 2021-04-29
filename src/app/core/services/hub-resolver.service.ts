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
export class HubResolverService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.authService.user$.pipe(
      // just take the first reading
      take(1),
      mergeMap(user => {        
        if (user) {
          if (!!user.roles) {
            // si existe el campo roles
            //console.log("user service: ", user.roles);
            let numeroRoles = Object.keys(user.roles).length;

            if (numeroRoles > 0) {
              console.log("User has at least one role.");
              if (numeroRoles >= 2) {
                // resolver al hub
                return of(user);
              } else {
                // si solo hay un rol
                // redireccionarlo directamente a la única página de acceso
                this.router.navigate([this.getRoute(user.roles)]);
              }
            } else {
              // no tiene roles
              // no se debe dar a no ser que el campo este creado
              // y no tenga registro, es decir un campo vacío.
              this.onLogout();
              return of(null);
            }

          } else {
            // si no existe el campo roles, retornal null
            this.onLogout();
            return of(null);
          }
        } else {
          this.onLogout();
          return of(null);
        }
      }), catchError((err) => {
        // para capturar los errores de base datos al momento de solicitar data
        this.onLogout();
        return of(null);
      })
    );

  }

  getRoute(roles: Roles) {
    // function called only when there user has one role
    let keys = Object.keys(roles);
    if (keys.length === 1) {
      switch (keys[0]) {
        case 'admin': {
          return 'admin';
        }
        case 'operaciones': {
          return 'operaciones';
        }
        case 'gerencia': {
          return 'gerencia';
        }
        case 'pilotos': {
          return 'pilotos';
        }
        case 'ventas': {
          return 'ventas';
        }
        case 'consultaATC': {
          return 'atc';
        }
        case 'rol_operadorTATI': {
          return 'operadorPCO'
        }
        case 'tvEstaciones': {
          return 'tvEstaciones'
        }
        case 'panel': {
          return 'panelSAE'
        }
        case 'paneles': {
          return 'paneles'
        }
        case 'planeamiento': {
          return 'planeamiento'
        }
        default:
          return 'login';
      }
    } else {
      return 'login';
    }
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

}
