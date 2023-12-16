import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  highways: any;
  roadWorks: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http
      .get<any>('https://verkehr.autobahn.de/o/autobahn/')
      .subscribe((data) => {
        this.highways = data;
      });
    console.log(this.highways);
    const road = this.highways.roads[0];
    this.http
      .get<any>(
        'https://verkehr.autobahn.de/o/autobahn/' + road + '/services/roadworks'
      )
      .subscribe((data) => {
        this.roadWorks = data;
        console.log(this.roadWorks);
      });
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 51.1657,
    lng: 10.4515,
  };
  zoom = 6;
  title = 'Highway Map';

  /*------------------------------------------
    --------------------------------------------
    moveMap()
    --------------------------------------------
    --------------------------------------------*/
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  /*------------------------------------------
    --------------------------------------------
    move()
    --------------------------------------------
    --------------------------------------------*/
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
