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
    let desc = data.description.join(',');
    let content =
      '<div>' +
      '<h4>' +
      data.displayType +
      '</h4>' +
      '<div>' +
      '<div class="info-window-data">' +
      '<div class="info-heading"><b>Title</b></div>' +
      '<div class="info-details">' +
      data.title +
      '</div>' +
      '</div>' +
      '<div class="info-window-data">' +
      '<div class="info-heading"><b>Sub Title</b></div>' +
      '<div class="info-details">' +
      data.subtitle +
      '</div>' +
      '</div>' +
      '<div class="info-window-data">' +
      '<div class="info-heading"><b>Description</b></div>' +
      '<div class="info-details">' +
      desc +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

  ngOnInit() {
    this.mapsData = this.mapService.getMapsDataOnLoad();
    this.addMarker();
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  updateMarker(data: {
    filteredData: { [x: string]: any };
    selectedOption: string;
  }) {
    this.markers = [];
    if (data.selectedOption === 'All') {
      this.mapsData = data.filteredData;
      this.addMarker();
    } else {
      let result = data.filteredData[Object.keys(data.filteredData)[0]];
      this.generateMarkerData(result);
    }
  }

  generateMarkerData(selectedRoadData: any) {
    let icon = {
      scale: 0.05,
      strokeWeight: 0.2,
      strokeOpacity: 1,
      fillOpacity: 0.7,
    };
    selectedRoadData?.forEach(
      (data: {
        markerIcon: any;
        description: any;
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
          options: {
            animation: google.maps.Animation.DROP,
            icon: {
              ...icon,
              path: selectedRoadData.markerIcon.path,
              fillColor: selectedRoadData.markerIcon.color,
            },
          },
          subtitle: data.subtitle,
          startTimestamp: data.startTimestamp,
          identifier: data.identifier,
          displayType: data.display_type,
          description: data.description,
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
