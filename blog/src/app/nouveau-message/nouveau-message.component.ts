import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-nouveau-message',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    JsonPipe
  ],
  templateUrl: './nouveau-message.component.html',
  styleUrl: './nouveau-message.component.css'
})

export class NouveauMessageComponent {

  constructor(private messagesService: MessagesService, private router: Router) {}

  // Pour récupérer le titre et le contenu du message créer
  message = { titre: '', contenu: '' };

  // Méthode appelée lors de la validation du formulaire
  onSubmit(form: NgForm) {
    this.messagesService.ajouterMessage(this.message).subscribe((nouveauMessage) => {
      console.log(nouveauMessage);
      //location.assign("/blog/" + nouveauMessage.id) // Redirige vers les détails du message créé
      this.router.navigate(['/liste-messages']);
    });
  }

}
