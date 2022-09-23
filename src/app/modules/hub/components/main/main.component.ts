import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Roles } from 'src/app/core/models/roles.model';
import { isEmpty, intersection } from 'lodash'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public user: User = null;
  private roles: Roles = null;

  // generador para las opciones del menú
  cards: any[] = [
    {
      icon: "fa-motorcycle",
      title: "Operaciones",
      text: "  ",
      roles: ["operaciones"],
      route: "operaciones",
      show: false
    },
    {
      icon: "fa-line-chart",
      title: "Comercial",
      text: "  ",
      roles: ["comercial"],
      route: "comercial",
      show: false
    },
  ]

  constructor(
    private authService: AuthService,
    private router: Router,
    private _route: ActivatedRoute,
  ) { 
    this._route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
      this.roles = data.user.roles;
      console.log(this.user)
    }, err => { console.log("Error hub:", err) });

    this.checkRoles()
  }

  ngOnInit(): void {}

  checkRoles() {
    for (let i = 0; i < this.cards.length; i++) {
      let hasRole = !isEmpty(intersection(this.cards[0].roles, Object.keys(this.roles)));
      this.cards[i].show = hasRole;
    }
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
