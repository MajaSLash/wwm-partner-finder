import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatchesStore {
  private _matches: any[] = [];

  get matches() {
    return this._matches;
  }

  add(user: any) {
    this._matches.push(user);
  }
}
