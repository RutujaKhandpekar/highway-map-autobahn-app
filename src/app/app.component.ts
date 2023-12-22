import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { MapService } from './services/map.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilterComponent } from './components/filter/filter.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatToolbarModule,
    FilterComponent,
    MatGridListModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;
  mapsData: any;
  markers: any[] = [];
  infoContent: any;
  constructor(private mapService: MapService) {}

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

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
  title = 'Autoban Highway Map';

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  updateMarker(filteredMarkerData: any) {
    let data = filteredMarkerData[Object.keys(filteredMarkerData)[0]];
    this.generateMarkerData(data);
  }

  generateMarkerData(selectedRoadData: any) {
    this.markers = [];
    selectedRoadData.forEach(
      (data: {
        subtitle: any;
        startTimestamp: any;
        identifier: any;
        display_type: any;
        label: any;
        coordinate: { lat: any; long: any };
        title: any;
      }) => {
        this.markers.push({
          position: {
            lat: parseFloat(data.coordinate.lat),
            lng: parseFloat(data.coordinate.long),
          },
          title: data.title,
          // label: {
          //   text: String.fromCharCode(parseInt(data.label)), // codepoint from https://fonts.google.com/icons
          //   fontFamily: 'Material Icons',
          //   color: '#ffffff',
          //   fontSize: '18px',
          // },
          options: { animation: google.maps.Animation.DROP },
          subtitle: data.subtitle,
          startTimestamp: data.startTimestamp,
          identifier: data.identifier,
          displayType: data.display_type,
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
