import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class FilterComponent {
  constructor(private mapService: MapService) {}
  roads: any[] = [];
  selectedRoad!: string;
  selectedFilter: string = 'All';
  roadFilters: any[] = Constants.ROAD_FILTERS;

  @Output() newMarkerEvent = new EventEmitter<any>();

  ngOnInit() {
    this.roads = this.mapService.getRoads();
    this.selectedRoad = this.roads[0]; // By default 0th road is selected in the filter
  }

  getFilteredData() {
    if (this.selectedFilter === 'All') {
      let filteredData: any = {};
      this.mapService.getMapsDataByRoad(this.selectedRoad).subscribe({
        next: (result: any) => {
          filteredData[this.selectedRoad] =
            this.mapService.generateFinalResult(result);
          this.newMarkerEvent.emit({
            filteredData,
            selectedOption: this.selectedFilter,
          });
        },
        error: (error: any) => console.log(error),
      });
    } else {
      this.mapService
        .getFilteredData(this.selectedRoad, this.selectedFilter)
        .subscribe({
          next: (filteredData: any) => {
            this.newMarkerEvent.emit({
              filteredData,
              selectedOption: this.selectedFilter,
            });
            if (
              filteredData &&
              !filteredData[Object.keys(filteredData)[0]]?.length
            ) {
              alert(
                'No ' +
                  Object.keys(filteredData)[0] +
                  ' found on selected road.'
              );
            }
          },
          error: (error: any) => console.log(error),
        });
    }
  }

  onRoadSelection(value: string) {
    this.selectedRoad = value;
    this.getFilteredData();
  }

  onFilterSelection(selectedOption: string) {
    this.selectedFilter = selectedOption;
    this.getFilteredData();
  }
}
