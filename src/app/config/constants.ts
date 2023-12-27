import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
  public static GERMANY_CENTER_LAT_LONG = {
    // center lat long of Germany
    lat: 51.1657,
    lng: 10.4515,
  };
  public static MAP_ZOOM = 6;
  public static ROAD_FILTERS = [
    'Roadworks',
    'Webcams',
    'Parking Lorry',
    'Warning',
    'Closure',
    'Electric Charging Station',
  ];

  public static GET_HIGHWAYS: string =
    'https://verkehr.autobahn.de/o/autobahn/';

  public static GET_ROADWORKS: string = '/services/roadworks';

  public static GET_WEBCAMS: string = '/services/webcam';

  public static GET_PARKING_LORRY: string = '/services/parking_lorry';

  public static GET_WARNING: string = '/services/warning';

  public static GET_CLOSURE: string = '/services/closure';

  public static GET_ELECTRIC_CHARGING_STATION: string =
    '/services/electric_charging_station';

  public static MARKER_ICON = {
    Roadworks: {
      path: 'M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z',
      color: 'orange',
    },
    Webcams: {
      path: 'M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z',
      color: 'green',
    },
    'Parking Lorry': {
      path: 'M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM192 256h48c17.7 0 32-14.3 32-32s-14.3-32-32-32H192v64zm48 64H192v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V288 168c0-22.1 17.9-40 40-40h72c53 0 96 43 96 96s-43 96-96 96z',
      color: 'blue',
    },
    Warning: {
      path: 'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z',
      color: 'yellow',
    },
    Closure: {
      path: 'M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z',
      color: 'red',
    },
    'Electric Charging Station': {
      path: 'M96 0C60.7 0 32 28.7 32 64V448c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32s-14.3-32-32-32V304h16c22.1 0 40 17.9 40 40v32c0 39.8 32.2 72 72 72s72-32.2 72-72V252.3c32.5-10.2 56-40.5 56-76.3V144c0-8.8-7.2-16-16-16H544V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H480V80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H432c-8.8 0-16 7.2-16 16v32c0 35.8 23.5 66.1 56 76.3V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V344c0-48.6-39.4-88-88-88H320V64c0-35.3-28.7-64-64-64H96zM216.9 82.7c6 4 8.5 11.5 6.3 18.3l-25 74.9H256c6.7 0 12.7 4.2 15 10.4s.5 13.3-4.6 17.7l-112 96c-5.5 4.7-13.4 5.1-19.3 1.1s-8.5-11.5-6.3-18.3l25-74.9H96c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7l112-96c5.5-4.7 13.4-5.1 19.3-1.1z',
      color: 'white',
    },
  };
}
