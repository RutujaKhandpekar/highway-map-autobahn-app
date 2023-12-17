import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { Constants } from './config/constants';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  webcams: any;
  roadWorks: any;
  markers: any[] = [];
  constructor(private mapService: MapService) {}

  ngOnInit() {
    const mapsData = this.mapService.getMapsData();
    this.roadWorks = mapsData[0];
    this.webcams = mapsData[1];
    console.log(this.roadWorks);
    console.log(this.webcams);

    this.addMarker();

    // this.http.get<any>(Constants.GET_HIGHWAYS).subscribe((data) => {
    //   this.highways = data;
    // });
    // console.log(this.highways);
    // const road = this.highways.roads[0];
    // this.http
    //   .get<any>(
    //     'https://verkehr.autobahn.de/o/autobahn/' + road + '/services/roadworks'
    //   )
    //   .subscribe((data) => {
    //     this.roadWorks = data;
    //     console.log(this.roadWorks);
    //   });
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 51.1657,
    lng: 10.4515,
  };
  zoom = 6;
  title = 'Highway Map';

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  addMarker() {
    this.roadWorks.roadworks.forEach(
      (roadWork: { coordinate: { lat: any; long: any }; title: any }) => {
        this.markers.push({
          position: {
            lat: parseFloat(roadWork.coordinate.lat),
            lng: parseFloat(roadWork.coordinate.long),
          },
          title: roadWork.title,
          options: { animation: google.maps.Animation.DROP },
        });
      }
    );
  }
}
