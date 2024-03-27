import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5500';

  constructor(private http: HttpClient) { }

  // Méthode pour se connecter
  connexion(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/connexion`, user);
  }

  //creer un compte
  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/creer-compte`, user);
  }

  //Récupérer les données de l'utilisateur actuellement connecté
  // Méthode pour récupérer les informations de l'utilisateur
  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profil/${userId}`);
  }

  updateProfile(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/profil/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/profil/${userId}`);
  }
}




