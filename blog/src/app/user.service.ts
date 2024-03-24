import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5500'; // Assurez-vous de mettre à jour l'URL en fonction de votre backend

  constructor(private http: HttpClient) { }

  // Méthode pour connecter l'utilisateur
  connexion(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/connexion`, user);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/creer-compte`, user);
  }

  //not used
  loginUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/connexion`, credentials);
  }

  //not used
  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, user);
  }

  //not used
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`);
  }
}
