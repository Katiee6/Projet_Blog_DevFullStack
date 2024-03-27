import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "./Message";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  private url = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  // Méthode utilisée lors de la validation du formulaire de création d'un message
  ajouterMessage(message:{titre:string, contenu:string}): Observable<Message> {
    //const message = {titre, contenu};
    return this.http.post<any>(this.url+'/nouveau-message', message);
  }

  // Méthode utilisée pour obtenir les détails d'un message
  getMessage(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.url}/message/${id}`);
  }

  // Méthode utilisée lors de la suppression d'un message PAS OK
  supprimerMessage(id: number): Observable<Message> {
    return this.http.delete<Message>(`${this.url}/message/${id}`);
  }

  // Méthode utilisée pour obtenir la liste des messages
  obtenirliste(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url+'/liste-messages');
  }

}
