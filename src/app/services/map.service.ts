import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { catchError, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getHighwayData(roadId: any): any {
    let highwayData: any = {};
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

    forkJoin([
      getRoadworks,
      getWebcams,
      getParkingLorries,
      getWarnings,
      getClosures,
      getElectricChargingStations,
    ]).subscribe({
      next: (result: any) => {
        highwayData.roadWorks = result[0].roadworks;
        if (highwayData && highwayData.roadWorks)
          highwayData.roadWorks.label = 'ea3c';
        highwayData.webCams = result[1].webcam;
        highwayData.parkingLorries = result[2].parking_lorry;
        highwayData.warnings = result[3].warning;
        highwayData.closures = result[4].closure;
        highwayData.electricChargingStations =
          result[5].electric_charging_station;
      },
      error: (error) => console.log(error),
    });
    return highwayData;
  }

  getMapsData(): any {
    let mapsData: any = {};

    this.http.get<any>(Constants.GET_HIGHWAYS).subscribe((highways) => {
      highways.roads.forEach((roadId: any) => {
        mapsData[roadId] = this.getHighwayData(roadId);
      });
    });

    return mapsData;
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
