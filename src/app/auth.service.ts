import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000';

  async login(username: string, password: string) {
    const res = await fetch(`${this.api}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  }

  async register(username: string, password: string) {
    const res = await fetch(`${this.api}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  get token() {
    return localStorage.getItem('token');
  }

  get user() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  get isLoggedIn() {
    return !!this.token;
  }
}
