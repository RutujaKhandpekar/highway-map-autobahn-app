import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/constants';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  // getHighways(): any {
  //   let highways;
  //   this.http.get<any>(Constants.GET_HIGHWAYS).subscribe((data) => {
  //     highways = data;
  //   });
  //   return highways;
  // }

  getMapsData(): any {
    let mapsData;
    this.http.get<any>(Constants.GET_HIGHWAYS).subscribe((data) => {
      const getRoadworks = this.http.get(
        Constants.GET_HIGHWAYS + data.roads[0] + Constants.GET_ROADWORKS
      );
      const getWebcams = this.http.get(
        Constants.GET_HIGHWAYS + data.roads[0] + Constants.GET_WEBCAMS
      );
      forkJoin([getRoadworks, getWebcams]).subscribe((result) => {
        mapsData = result;
      });
    });
    return mapsData;
  }
}
