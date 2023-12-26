import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { catchError, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getHighwayDataCallback(roadId: any): any {
    const getRoadworks = this.http
      .get(Constants.GET_HIGHWAYS + roadId + Constants.GET_ROADWORKS)
      .pipe(catchError((error) => of(error)));
    const getWebcams = this.http
      .get(Constants.GET_HIGHWAYS + roadId + Constants.GET_WEBCAMS)
      .pipe(catchError((error) => of(error)));
    const getParkingLorries = this.http
      .get(Constants.GET_HIGHWAYS + roadId + Constants.GET_PARKING_LORRY)
      .pipe(catchError((error) => of(error)));
    const getWarnings = this.http
      .get(Constants.GET_HIGHWAYS + roadId + Constants.GET_WARNING)
      .pipe(catchError((error) => of(error)));
    const getClosures = this.http
      .get(Constants.GET_HIGHWAYS + roadId + Constants.GET_CLOSURE)
      .pipe(catchError((error) => of(error)));
    const getElectricChargingStations = this.http
      .get(
        Constants.GET_HIGHWAYS +
          roadId +
          Constants.GET_ELECTRIC_CHARGING_STATION
      )
      .pipe(catchError((error) => of(error)));

    return forkJoin([
      getRoadworks,
      getWebcams,
      getParkingLorries,
      getWarnings,
      getClosures,
      getElectricChargingStations,
    ]);
  }

  generateFinalResult(result: any[]): any {
    let highwayData: any = {};
    highwayData.roadWorks = result[0].roadworks;
    if (highwayData && highwayData.roadWorks)
      highwayData.roadWorks.markerIcon = Constants.MARKER_ICON.Roadworks;
    highwayData.webCams = result[1].webcam;

    if (highwayData && highwayData.webCams)
      highwayData.webCams.markerIcon = Constants.MARKER_ICON.Webcams;
    highwayData.parkingLorries = result[2].parking_lorry;

    if (highwayData && highwayData.parkingLorries)
      highwayData.parkingLorries.markerIcon =
        Constants.MARKER_ICON['Parking Lorry'];
    highwayData.warnings = result[3].warning;

    if (highwayData && highwayData.warnings)
      highwayData.warnings.markerIcon = Constants.MARKER_ICON.Warning;
    highwayData.closures = result[4].closure;

    if (highwayData && highwayData.closures)
      highwayData.closures.markerIcon = Constants.MARKER_ICON.Closure;
    highwayData.electricChargingStations = result[5].electric_charging_station;

    if (highwayData && highwayData.electricChargingStations)
      highwayData.electricChargingStations.markerIcon =
        Constants.MARKER_ICON['Electric Charging Station'];
    return highwayData;
  }

  getMapsData(): any {
    let mapsData: any = {};

    this.http.get<any>(Constants.GET_HIGHWAYS).subscribe((highways) => {
      highways.roads.forEach((roadId: any) => {
        this.getHighwayDataCallback(roadId).subscribe({
          next: (result: any) => {
            mapsData[roadId] = this.generateFinalResult(result);
          },
          error: (error: any) => console.log(error),
        });
      });
    });

    return mapsData;
  }

  getMapsDataOnLoad(): any {
    let mapsData: any = {};

    this.http.get<any>(Constants.GET_HIGHWAYS).subscribe((highways) => {
      this.getHighwayDataCallback(highways.roads[0]).subscribe({
        next: (result: any) => {
          mapsData[highways.roads[0]] = this.generateFinalResult(result);
        },
        error: (error: any) => console.log(error),
      }); // be default 0th road is selected
    });

    return mapsData;
  }

  getMapsDataByRoad(road: any): any {
    return this.getHighwayDataCallback(road);
  }

  getRoads(): any {
    let roads: any = [];
    this.http.get<any>(Constants.GET_HIGHWAYS).subscribe((highways) => {
      roads = highways.roads;
    });
    return roads;
  }

  getFilteredData(roadId: string, filter: string): any {
    let filteredQuery: string;
    switch (filter) {
      case 'Roadworks':
        filteredQuery =
          Constants.GET_HIGHWAYS + roadId + Constants.GET_ROADWORKS;
        break;
      case 'Webcams':
        filteredQuery = Constants.GET_HIGHWAYS + roadId + Constants.GET_WEBCAMS;
        break;
      case 'Parking Lorry':
        filteredQuery =
          Constants.GET_HIGHWAYS + roadId + Constants.GET_PARKING_LORRY;
        break;
      case 'Warning':
        filteredQuery = Constants.GET_HIGHWAYS + roadId + Constants.GET_WARNING;
        break;
      case 'Closure':
        filteredQuery = Constants.GET_HIGHWAYS + roadId + Constants.GET_CLOSURE;
        break;
      case 'Electric Charging Station':
        filteredQuery =
          Constants.GET_HIGHWAYS +
          roadId +
          Constants.GET_ELECTRIC_CHARGING_STATION;
        break;
      default:
        filteredQuery =
          Constants.GET_HIGHWAYS + roadId + Constants.GET_ROADWORKS;
        break;
    }
    return this.http.get<any>(filteredQuery);
  }
}
