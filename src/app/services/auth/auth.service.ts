import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  isAuthenticated: Subject<boolean> = new Subject<boolean>();
  login(data: { username: string, password: string}) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated.next(value);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || '{}');
  }

  getUserProfile(id: number) {
    return this.http.get(`${environment.apiUrl}/profile/user/${id}`);
  }

  updateUserProfile(id: number, data: any) {
    return this.http.patch(`${environment.apiUrl}/profile/user/${id}`, data);
  }
}
