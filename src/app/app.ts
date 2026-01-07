import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="menu">
      <button class="button-89" routerLink="/">Swipe</button>
      <button class="button-89" routerLink="/matches">Matches</button>
      <button class="button-89" routerLink="/profile">Profile</button>
    </nav>

    <router-outlet />
  `,
  styleUrl: './app.css',
})
export class AppComponent {
  flashClass: 'flash-right' | 'flash-left' | '' = '';
  flashOpacity = 0; // 0 to 0.6
  flashSide: 'left' | 'right' | '' = '';

  // Called while dragging
  onDragProgress(progress: number) {
    if (progress > 0) {
      this.flashSide = 'right';
      this.flashOpacity = progress * 0.6; // scale up to max 0.6 opacity
    } else if (progress < 0) {
      this.flashSide = 'left';
      this.flashOpacity = Math.abs(progress) * 0.6;
    } else {
      this.flashSide = '';
      this.flashOpacity = 0;
    }
  }
}
