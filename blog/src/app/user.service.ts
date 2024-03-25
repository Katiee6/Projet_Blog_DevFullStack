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

  //creer l'utilisateur
  createUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/creer-compte`, user);
  }






  //Récupérer les données de l'utilisateur actuellement connecté
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profil`);
  }

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




