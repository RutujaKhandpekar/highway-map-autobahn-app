import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'Autoban Highway Map';
}
