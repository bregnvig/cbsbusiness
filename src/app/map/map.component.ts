import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Center, LeafletComponent, Markers } from '@loopme/leaflet';
import { combineLatest, map, switchMap } from 'rxjs';
import { FooterComponent } from "../footer/footer.component";
import { LocationService } from '../shared';
import { Playground } from '../shared/playground';
import { PlaygroundService } from '../shared/playground.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-map',
  template: `
  <main class="vh-100 d-flex justify-content-center align-items-center ">
    <leaflet [center]="center" [markers]="markers"/>
  <app-sidebar [playgrounds]="playgrounds" [selectedPlayground]="playground" (selected)="selected($event)"/>
  <app-footer [playground]="playground"/>
  `,
  standalone: true,
  imports: [SidebarComponent, LeafletComponent, FooterComponent]
})
export class MapComponent {
  playgrounds?: Playground[];
  playground?: Playground;
  center: Center = {
    lat: 56.360029,
    lng: 10.746635,
  };
  markers?: Markers;

  constructor(service: PlaygroundService, private router: Router, location: LocationService, route: ActivatedRoute) {
    combineLatest({
      playgrounds: service.getPlaygrounds(),
      position: location.current
    }).pipe(
      map(({ playgrounds, position }) => {
        const d = location.getDistance;
        return [...playgrounds].sort((a, b) => d(a.position, position) - d(b.position, position));
      })
    ).subscribe(playgrounds => this.playgrounds = playgrounds);
    const playground$ = route.params.pipe(
      map(params => params['id']),
      switchMap(id => service.getPlayground(id))
    );
    playground$.subscribe(playground => {
      this.playground = playground;
      playground && (this.center = ({ ...playground.position, zoom: 15 }));
    });
    combineLatest([
      location.current,
      playground$.pipe(
        map(playground => playground?.position)
      )
    ]).subscribe(markers => this.markers = markers);
  }

  selected(playground: Playground) {
    this.router.navigate([playground.id]);
  }
}
