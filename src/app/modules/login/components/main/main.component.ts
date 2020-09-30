import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public email: string = "";
  public password: string = "";

  user$ = new Observable<User>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (this.email != "" && this.password != "") {
      this.authService.loginEmailUser(this.email, this.password)
        .then((res) => {
          form.reset();
          this.onLoginRedirect();
        })
        .catch(err => {
          // alert("Credenciales incorrectar. Intente nuevamente");
          switch (err.code) {
            case 'auth/user-not-found':
              alert('El usuario ingresado no existe.');
              break;
            case 'auth/wrong-password':
              alert('La contraseña es incorrecta. Intente nuevamente.');
              break;
            case 'auth/invalid-email':
              alert('Ingrese un email válido.');
              break;
            default:
              console.log(err.code);
              alert('Ha ocurrido un error. Intente nuevamente.');
              break
          }
          this.router.navigate(['/login']);
        });
    }
  }

  onLoginRedirect() {
    if (this.authService.redirectUrl) {
      // console.log("redirect to:" + this.authService.redirectUrl);
      this.router.navigate([this.authService.redirectUrl]);
      this.authService.redirectUrl = null;
    } else {
      console.log("al hub!");
      this.router.navigate(['hub']);
    }
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
