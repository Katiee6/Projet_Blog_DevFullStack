import { Routes } from '@angular/router';
import {MessageComponent} from "./message/message.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {CreerCompteComponent} from "./creer-compte/creer-compte.component";
import {BlogComponent} from "./blog/blog.component";
import {NouveauMessageComponent} from "./nouveau-message/nouveau-message.component";
import {ListeMessagesComponent} from "./liste-messages/liste-messages.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  {
    path : '', redirectTo : 'ConnexionComponent', pathMatch :'full'
  },
  { path: 'connexion', component: ConnexionComponent },

  { path: 'creer-compte', component: CreerCompteComponent },
  { path: 'profile', component: ProfileComponent },


  {
    path : '',
    component : BlogComponent,
  },
  { path: 'blog', component: BlogComponent },
  //{ path: 'blog/message/:id', component: MessageComponent }, //A utiliser : spécifique à un message
  { path: 'blog/test-message', component: MessageComponent }, //Pour le test
  { path: 'blog', component: BlogComponent }, // ?? supprimer blog ??
  { path: ':user', component: ListeMessagesComponent }, // ?? Apres la connexion, afficher la liste des messages de l'utilisateur
  { path: 'blog/message/:id', component: MessageComponent }, //Spécifique à un message
  { path: 'blog/test-message', component: MessageComponent }, // Pour le test : A CHANGER -> message spécifique
  { path: 'blog/nouveau', component: NouveauMessageComponent },
  { path: 'blog/liste', component: ListeMessagesComponent },
  { path: '**', redirectTo: 'blog' } // Vers Connexion ou Blog ???
];
