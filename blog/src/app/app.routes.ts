import { Routes } from '@angular/router';
import {MessageComponent} from "./message/message.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {BlogComponent} from "./blog/blog.component";
import {NouveauMessageComponent} from "./nouveau-message/nouveau-message.component";

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'blog', component: BlogComponent },
  //{ path: 'blog/message/:id', component: MessageComponent }, //A utiliser : spécifique à un message
  { path: 'blog/test-message', component: MessageComponent }, //Pour le test
  { path: 'blog/nouveau', component: NouveauMessageComponent },
  { path: '**', redirectTo: 'connexion' } // Voir si on redirige vers Connexion ou Blog
];
