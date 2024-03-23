import {Component, OnInit} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Message} from "../Message";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [
    RouterLink,
    JsonPipe,
    NgIf
  ],
  styleUrl: './message.component.css'
})

export class MessageComponent implements OnInit{

  message!: Message;

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {
    const messageId = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.messagesService.getMessage(messageId)
      .subscribe(message => this.message = message);
  }

  // Méthode qui permet de supprimer un message
  supprimer(message: Message) {
    location.assign("/blog/liste") // Redirige vers la liste //REDIRIGER VERS L'ACCUEIL???
    this.messagesService.supprimerMessage(message.id).subscribe();
  }

}
