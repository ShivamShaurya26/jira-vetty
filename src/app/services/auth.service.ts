import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_KEY = 'vetty_auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuth());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  private checkAuth(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(email: string, password: string): boolean {
    if (email === 'admin@test.com' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, 'true');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    this.isAuthenticatedSubject.next(false);
  }
}
