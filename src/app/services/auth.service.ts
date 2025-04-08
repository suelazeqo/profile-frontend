import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = inject(API_URL);

  constructor(private http: HttpClient) {
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true,
    });
  }


  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }


  logout() {
    localStorage.removeItem('token');
  }
}
