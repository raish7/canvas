import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(data: { username: string, password: string}) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || '{}');
  }
}
