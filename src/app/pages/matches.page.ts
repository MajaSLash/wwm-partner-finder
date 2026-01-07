import { Component } from '@angular/core';
import { MatchesStore } from '../matches.store';

@Component({
  standalone: true,
  template: `
    <h2>Matches</h2>

    @if (matches.length === 0) {
    <p>No matches yet</p>
    } @else {
    <ul>
      @for (user of matches; track user) {
      <li>{{ user.name }} — {{ user.role }} — Lv {{ user.level }}</li>
      }
    </ul>
    }
  `,
})
export class MatchesPage {
  constructor(private store: MatchesStore) {}

  get matches() {
    return this.store.matches;
  }
}
