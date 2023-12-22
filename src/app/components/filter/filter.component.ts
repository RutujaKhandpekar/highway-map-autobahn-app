import { Component, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MapService } from '../../services/map.service';
import { MatRadioModule } from '@angular/material/radio';
import { Constants } from '../../config/constants';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, MatRadioModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.less',
})
export class FilterComponent {
  constructor(private mapService: MapService) {}
  roads: any[] = [];
  selectedRoad!: string;
  roadFilters: any[] = Constants.ROAD_FILTERS;

  @Output() newMarkerEvent = new EventEmitter<string>();

  ngOnInit() {
    this.roads = this.mapService.getRoads();
    this.selectedRoad = this.roads[0]; // By default 0th road is selected in the filter
  }

  onRoadSelection(value: string) {
    this.selectedRoad = value;
  }

  onFilterSelection(value: string) {
    this.mapService.getFilteredData(this.selectedRoad, value).subscribe({
      next: (result: any) => {
        this.newMarkerEvent.emit(result);
      },
      error: (error: any) => console.log(error),
    });
  }
}
