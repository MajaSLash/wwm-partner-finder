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
      <h2>Register</h2>

      <input placeholder="Username" [(ngModel)]="username" />
      <input placeholder="Password" type="password" [(ngModel)]="password" />

      <button (click)="register()">Register</button>

      <p class="error" *ngIf="error">{{ error }}</p>
      <a routerLink="/login">Back to login</a>
    </div>
  `,
})
export class RegisterPage {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    try {
      await this.auth.register(this.username, this.password);
      this.router.navigate(['/login']);
    } catch (e: any) {
      this.error = e.message;
    }
  }
}
