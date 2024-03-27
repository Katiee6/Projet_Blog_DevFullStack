import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Message} from "./Message";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  JWT_TOKEN = 'token';
  constructor(private http: HttpClient) { }
  login(credentials: { id: string, motDePasse: string }): Observable<any> {
    return this.http.post<any>('/connexion', credentials);
  }


  //version non fini avec les 'token' et pas used
  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }


  getAuthorizationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
  }
}
