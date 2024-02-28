import { Component, Input } from '@angular/core';
import { Playground } from '../shared/playground';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    @if(playground) {
      <footer>
        <h3>{{playground.name}}</h3>
        <p>{{playground.addressDescription}}</p>
        <p>{{playground.description}}</p>
      </footer>
    }
  `,
})
export class FooterComponent {
  @Input({ required: true }) playground?: Playground;
}
