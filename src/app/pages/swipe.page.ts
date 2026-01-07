import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card';
import { MatchesStore } from '../matches.store';
import { User } from '../card/card';

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

  users: User[] = [
    {
      name: 'Alex',
      age: 25,
      img: 'https://picsum.photos/300/400?1',
      gender: 'male',
      role: 'dps',
      level: 42,
      region: 'NA',
    },
    {
      name: 'Jamie',
      age: 28,
      img: 'https://picsum.photos/300/400?2',
      gender: 'female',
      role: 'support',
      level: 55,
      region: 'EU',
    },
    {
      name: 'Taylor',
      age: 22,
      img: 'https://picsum.photos/300/400?3',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
    {
      name: '123',
      age: 22,
      img: 'https://picsum.photos/300/400?4',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
    {
      name: 'Taytjhsdrlor',
      age: 22,
      img: 'https://picsum.photos/300/400?5',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
    {
      name: 'sdfgs',
      age: 22,
      img: 'https://picsum.photos/300/400?6',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
    {
      name: 'sdfgsdfhrjdyhj',
      age: 22,
      img: 'https://picsum.photos/300/400?7',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
    {
      name: 'tyjtjytjtyj',
      age: 223,
      img: 'https://picsum.photos/300/400?8',
      gender: 'non-binary',
      role: 'tank',
      level: 230,
      region: 'ASIA',
    },
    {
      name: 'Turturtyaylor',
      age: 22,
      img: 'https://picsum.photos/300/400?9',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
  ];

  onSwipe(user: any, dir: 'left' | 'right') {
    if (dir === 'right') {
      this.matches.add(user);
    }
    this.users = this.users.filter((u) => u !== user);
  }
}
