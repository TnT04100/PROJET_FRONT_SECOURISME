import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
