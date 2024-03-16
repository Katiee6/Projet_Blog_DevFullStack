import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Message} from "../Message";

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [
    RouterLink,
    JsonPipe
  ],
  styleUrl: './message.component.css'
})

export class MessageComponent implements OnInit{

  message!: Message;

  ngOnInit(): void {
    // /!\ Pour le test seulement
    this.message = new Message();
    this.message.titre = 'Voici le titre';
    this.message.contenu = 'Voici le contenu';
  }

  // Méthode qui permet de supprimer un message
  supprimer(message: Message) {
    // A ECRIRE
  }

}

