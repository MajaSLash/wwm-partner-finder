import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card';

type User = {
  name: string;
  age: number;
  img: string;
  gender: 'male' | 'female' | 'non-binary';
  role: 'tank' | 'dps' | 'support';
  level: number;
  region: 'NA' | 'EU' | 'ASIA';
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CardComponent],
  template: `<div
      class="flash-overlay"
      [class.flash-left]="flashSide === 'left'"
      [class.flash-right]="flashSide === 'right'"
      [style.--flashAlpha]="flashOpacity"
    ></div>
    <div class="filters">
      <select [(ngModel)]="filters.gender">
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
      </select>

      <select [(ngModel)]="filters.role">
        <option value="">All Roles</option>
        <option value="tank">Tank</option>
        <option value="dps">DPS</option>
        <option value="support">Support</option>
      </select>

      <select [(ngModel)]="filters.region">
        <option value="">All Regions</option>
        <option value="NA">NA</option>
        <option value="EU">EU</option>
        <option value="ASIA">ASIA</option>
      </select>

      <input type="number" placeholder="Min Level" [(ngModel)]="filters.minLevel" />
    </div>
    <div class="container">
      @for (user of filteredUsers; track user; let i = $index) {
      <app-card [user]="user" (dragProgress)="onDragProgress($event)" (swipe)="onSwipe(i, $event)">
      </app-card>
      }
    </div>`,
  styleUrl: './app.css',
})
export class AppComponent {
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
      name: 'Taylor',
      age: 22,
      img: 'https://picsum.photos/300/400?9',
      gender: 'non-binary',
      role: 'tank',
      level: 30,
      region: 'ASIA',
    },
  ];

  filters = {
    gender: '' as '' | User['gender'],
    role: '' as '' | User['role'],
    region: '' as '' | User['region'],
    minLevel: 0,
  };

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

  // Called on swipe complete
  onSwipe(index: number, dir: 'left' | 'right') {
    console.log(dir, this.users[index]);
    this.users.splice(index, 1);

    // Full flash on release
    this.flashSide = dir;
    this.flashOpacity = 0.6;

    setTimeout(() => {
      this.flashSide = '';
      this.flashOpacity = 0;
    }, 300);
  }

  get filteredUsers(): User[] {
    return this.users.filter((user) => {
      return (
        (!this.filters.gender || user.gender === this.filters.gender) &&
        (!this.filters.role || user.role === this.filters.role) &&
        (!this.filters.region || user.region === this.filters.region) &&
        user.level >= this.filters.minLevel
      );
    });
  }
}
