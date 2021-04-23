import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleService } from 'src/app/core/services/title.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title: Observable<String>;

  constructor(
    public sidebarService: SidebarService,
    public titleService: TitleService
  ) {
    this.title = this.titleService.getTitle();
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarService.hasBackgroundImage = !this.sidebarService.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }

  hideSidebar() {
    this.sidebarService.setSidebarState(true);
  }

}
