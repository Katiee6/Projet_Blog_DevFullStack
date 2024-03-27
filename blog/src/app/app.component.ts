import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MessageComponent} from "./message/message.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {CreerCompteComponent} from "./creer-compte/creer-compte.component";
import {ProfilComponent} from "./profil/profil.component";
import {BlogComponent} from "./blog/blog.component";
import {NouveauMessageComponent} from "./nouveau-message/nouveau-message.component";
import {HttpClientModule} from "@angular/common/http";
import {ListeMessagesComponent} from "./liste-messages/liste-messages.component";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageComponent, ConnexionComponent,CreerCompteComponent, FooterComponent,NavbarComponent,ProfilComponent, BlogComponent, NouveauMessageComponent, RouterLink, RouterLinkActive, HttpClientModule, ListeMessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog';
}
