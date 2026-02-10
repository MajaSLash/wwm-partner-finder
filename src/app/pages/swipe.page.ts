import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card';
import { MatchesStore } from '../matches.store';
import { User } from '../card/card';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="container">
      @for (user of users; track user.name) {
      <app-card [user]="user" (swipe)="onSwipe(user, $event)"> </app-card>
      }
    </div>
  `,
})
export class SwipePage {
  private matches = inject(MatchesStore);
  private auth = inject(AuthService);

  users: User[] = [
    {
      id: 1,
      name: 'Alex',
      age: 25,
      img: 'https://picsum.photos/300/400?1',
      gender: 'male',
      role: 'dps',
      level: 42,
      region: 'NA',
    },
    {
      id: 2,
      name: 'Jamie',
      age: 28,
      img: 'https://picsum.photos/300/400?2',
      gender: 'female',
      role: 'support',
      level: 55,
      region: 'EU',
    },
    {
      id: 3,
      name: 'Taylor',
      age: 22,
      img: 'https://picsum.photos/300/400?3',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
    {
      id: 4,
      name: 'Morgan',
      age: 31,
      img: 'https://picsum.photos/300/400?4',
      gender: 'male',
      role: 'dps',
      level: 38,
      region: 'NA',
    },
    {
      id: 5,
      name: 'Jordan',
      age: 26,
      img: 'https://picsum.photos/300/400?5',
      gender: 'female',
      role: 'support',
      level: 44,
      region: 'EU',
    },
  ];

  async onSwipe(user: User, dir: 'left' | 'right') {
    if (dir === 'right') {
      // Send to backend
      //try {
      //  await fetch(`http://localhost:3000/matches/swipe-right/${user.id}`, {
      //    method: 'POST',
      //    headers: {
      //      Authorization: `Bearer ${this.auth.token}`,
      //      'Content-Type': 'application/json',
      //    },
      //  });
      this.matches.add(user);
      //  this.users = this.users.filter((u) => u.id !== user.id);
      //} catch (err) {
      //  console.error('Error saving swipe:', err);
      //}
    }

    // Remove user from local swipe deck
    this.users = this.users.filter((u) => u !== user);
  }
}
