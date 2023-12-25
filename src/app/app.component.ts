import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 51.1657,
    lng: 10.4515,
  };
  zoom = 6;
  title = 'Autoban Highway Map';
  mapsData: any;
  markers: any[] = [];
  infoContent: any;
  constructor(private mapService: MapService) {}

  openInfo(marker: MapMarker, data: any) {
    this.infoContent = data.title;
    this.infoWindow.open(marker);
  }

  ngOnInit() {
    this.mapsData = this.mapService.getMapsData();
    this.addMarker();
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  updateMarker(filteredMarkerData: any) {
    let data = filteredMarkerData[Object.keys(filteredMarkerData)[0]];
    this.generateMarkerData(data, true);
  }

  generateMarkerData(selectedRoadData: any, isFilteredResult: boolean) {
    if (isFilteredResult) this.markers = [];
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
        this.generateMarkerData(this.mapsData[road][roadData], false);
      }
    }
  }
}
