import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.env = environment.APP_URL;
  }

  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/registerUser', user);
  }

  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin' ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._router.navigate(['/login']);
  }

  getRole(email: string) {
    return this._http.get<any>(this.env + 'user/getRole/' + email);
  }

  listUser(name: string) {
    return this._http.get<any>(this.env + 'user/listUsers/' + name);
  }

  updateUser(user: any) {
    return this._http.put<any>(this.env + 'user/updateUser', user);
  }

  deleteUser(user: any) {
    return this._http.put<any>(this.env + 'user/deleteUser', user);
  }

  registerAdmin(user: any) {
    return this._http.post<any>(this.env + 'user/registerAdmin', user);
  }
}
