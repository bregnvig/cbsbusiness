import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from './coordinate';
import { LocationService } from './location.service';

@Pipe({
  name: 'distance',
  standalone: true,
})
export class DistancePipe implements PipeTransform {

  constructor(private location: LocationService) { }

  transform(position: Coordinate, location: Coordinate | undefined): string {

    if (!position || !location) {
      return 'Unknown';
    }
    return this.location.getDistance(position, location).toString() + ' m';
  }
}
