import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
  public static GET_HIGHWAYS: string =
    'https://verkehr.autobahn.de/o/autobahn/';

  public static GET_ROADWORKS: string = '/services/roadworks';

  public static GET_WEBCAMS: string = '/services/webcam';

  public static GET_PARKING_LORRY: string = '/services/parking_lorry';

  public static GET_WARNING: string = '/services/warning';

  public static GET_CLOSURE: string = '/services/closure';

  public static GET_ELECTRIC_CHARGING_STATION: string =
    '/services/electric_charging_station';
}
