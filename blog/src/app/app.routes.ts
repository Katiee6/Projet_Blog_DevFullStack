import { Routes } from '@angular/router';
import {MessageComponent} from "./message/message.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {CreerCompteComponent} from "./creer-compte/creer-compte.component";
import {BlogComponent} from "./blog/blog.component";
import {NouveauMessageComponent} from "./nouveau-message/nouveau-message.component";
import {ListeMessagesComponent} from "./liste-messages/liste-messages.component";
import {ProfilComponent} from "./profil/profil.component";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'creer-compte', component: CreerCompteComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'nouveau-message', component: NouveauMessageComponent },
  { path: 'liste-messages', component: ListeMessagesComponent },
  { path: 'message/:id', component: MessageComponent }, //Spécifique à un message
  { path : '', redirectTo : 'blog', pathMatch :'full'},
  { path: '**', redirectTo: 'blog' },
];
