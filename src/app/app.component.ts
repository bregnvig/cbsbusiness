import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <main class="vh-100 d-flex justify-content-center align-items-center">
    <div class="d-relative">
      <img src="assets/angular.png" height="400">
    </div>
  </main>
  `,
  standalone: true
})
export class AppComponent {
}
