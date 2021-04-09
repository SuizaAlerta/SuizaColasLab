import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'general';

  lat = 22.4064172;
  long = 69.0750171;
  zoom=7;
  
  markers = [
        {
            lat: 21.1594627,
            lng: 72.6822083,
            label: 'Surat'
        },
        {
            lat: 23.0204978,
            lng: 72.4396548,
            label: 'Ahmedabad'
        },
        {
            lat: 22.2736308,
            lng: 70.7512555,
            label: 'Rajkot'
        }
    ];

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
  ) {

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinnerService.show();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.spinnerService.hide();
          break;
        default:
          break;
      }
    });
  }
}
