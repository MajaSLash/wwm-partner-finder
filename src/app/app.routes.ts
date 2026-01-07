import { Routes } from '@angular/router';
import { SwipePage } from './pages/swipe.page';
import { ProfilePage } from './pages/profile.page';
import { MatchesPage } from './pages/matches.page';

export const routes: Routes = [
  { path: '', component: SwipePage },
  { path: 'profile', component: ProfilePage },
  { path: 'matches', component: MatchesPage },
];
