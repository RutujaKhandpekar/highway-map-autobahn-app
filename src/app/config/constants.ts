import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
  public static GET_HIGHWAYS: string =
    'https://verkehr.autobahn.de/o/autobahn/';

  public static GET_ROADWORKS: string = '/services/roadworks';

  public static GET_WEBCAMS: string = '/services/webcam';
}
