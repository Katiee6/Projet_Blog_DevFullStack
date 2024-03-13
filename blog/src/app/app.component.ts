import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MessageComponent} from "./message/message.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {BlogComponent} from "./blog/blog.component";
import {NouveauMessageComponent} from "./nouveau-message/nouveau-message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageComponent, ConnexionComponent, BlogComponent, NouveauMessageComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog';
}
