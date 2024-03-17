import { Routes } from '@angular/router';
import {MessageComponent} from "./message/message.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {CreerCompteComponent} from "./creer-compte/creer-compte.component";
import {BlogComponent} from "./blog/blog.component";
import {NouveauMessageComponent} from "./nouveau-message/nouveau-message.component";

export const routes: Routes = [
  {
    path : '', redirectTo : 'ConnexionComponent', pathMatch :'full'
  },
  { path: 'connexion', component: ConnexionComponent },

  { path: 'creer-compte', component: CreerCompteComponent },
  {
    path : '',
    component : BlogComponent,
  },
  { path: 'blog', component: BlogComponent },
  //{ path: 'blog/message/:id', component: MessageComponent }, //A utiliser : spécifique à un message
  { path: 'blog/test-message', component: MessageComponent }, //Pour le test
  { path: 'blog/nouveau', component: NouveauMessageComponent },
];
