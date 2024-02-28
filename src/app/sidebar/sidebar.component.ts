import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coordinate, DistancePipe, LocationService, Playground } from '../shared';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [DistancePipe]
})
export class SidebarComponent {
  @Input() playgrounds?: Playground[];
  @Output() selected = new EventEmitter<Playground>();
  @Input() selectedPlayground?: Playground;
  location?: Coordinate;

  constructor(location: LocationService) {
    location.current.subscribe(location => this.location = location);
  }
}
