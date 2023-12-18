import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { GoogleMapsModule } from '@angular/google-maps';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  mapsData: any;
  markers: any[] = [];
  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapsData = this.mapService.getMapsData();
    this.addMarker();
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

  generateMarkerData(selectedRoadData: any) {
    selectedRoadData.forEach(
      (data: { coordinate: { lat: any; long: any }; title: any }) => {
        this.markers.push({
          position: {
            lat: parseFloat(data.coordinate.lat),
            lng: parseFloat(data.coordinate.long),
          },
          title: data.title,
          options: { animation: google.maps.Animation.DROP },
        });
      }
    );
  }

  addMarker() {
    for (let road in this.mapsData) {
      for (let roadData in this.mapsData[road]) {
        this.generateMarkerData(this.mapsData[road][roadData]);
      }
    }
  }
}
