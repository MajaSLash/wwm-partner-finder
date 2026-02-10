import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-form">
      <input placeholder="Username" [(ngModel)]="username" />
      <input placeholder="Password" type="password" [(ngModel)]="password" />
      <button (click)="login()">Login</button>
      <p *ngIf="error" class="error">{{ error }}</p>
    </div>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth
      .login(this.username, this.password)
      .then((user) => {
        console.log('Logged in as', user);
        this.router.navigate(['/']); // redirect to main page
      })
      .catch((err) => {
        this.error = err.message;
      });
  }
}
