import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { TitleService } from 'src/app/core/services/title.service';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  menus = [];

  constructor(
    private sidebarService: SidebarService,
    private titleService: TitleService,
    private router: Router,
    private authService: AuthService,

  ) {
    this.menus = sidebarService.getMenuList();
  }


  ngOnInit(): void {
  }
  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.title !== 'Salir') {
      if (currentMenu.type === 'dropdown') {
        this.menus.forEach(element => {
          if (element === currentMenu) {
            currentMenu.active = !currentMenu.active;
          } else {
            element.active = false;
          }
        });
      }
    } else {
      this.onLogout();
    }

  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarService.hasBackgroundImage;
  }

  toggleSidebar(title: string) {
    this.sidebarService.toggle();
    this.titleService.setTitle(title);
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }

}
