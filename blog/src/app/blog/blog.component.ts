import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {ConnexionComponent} from "../connexion/connexion.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    ConnexionComponent,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
