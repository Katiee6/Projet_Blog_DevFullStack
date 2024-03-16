import { Routes } from '@angular/router';
import {MessageComponent} from "./message/message.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {BlogComponent} from "./blog/blog.component";
import {NouveauMessageComponent} from "./nouveau-message/nouveau-message.component";
import {ListeMessagesComponent} from "./liste-messages/liste-messages.component";

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'blog', component: BlogComponent }, // ?? supprimer blog ??
  { path: ':user', component: ListeMessagesComponent }, // ?? Apres la connexion, afficher la liste des messages de l'utilisateur
  { path: 'blog/message/:id', component: MessageComponent }, //Spécifique à un message
  { path: 'blog/test-message', component: MessageComponent }, // Pour le test : A CHANGER -> message spécifique
  { path: 'blog/nouveau', component: NouveauMessageComponent },
  { path: 'blog/liste', component: ListeMessagesComponent },
  { path: '**', redirectTo: 'connexion' } // Vers Connexion ou Blog ???
];
