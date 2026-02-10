import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="auth">
      <h2>Login</h2>

      <input placeholder="Username" [(ngModel)]="username" />
      <input placeholder="Password" type="password" [(ngModel)]="password" />

      <button (click)="login()">Login</button>

      <p class="error" *ngIf="error">{{ error }}</p>
      <a routerLink="/register">Create account</a>
    </div>
  `,
  styles: [
    `
      .auth {
        max-width: 300px;
        margin: 80px auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      input,
      button {
        padding: 10px;
      }
      .error {
        color: red;
      }
    `,
  ],
})
export class LoginPage {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      await this.auth.login(this.username, this.password);
      this.router.navigate(['/']);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
