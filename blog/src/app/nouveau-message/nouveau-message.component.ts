import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {Message} from "../Message";
import {JsonPipe} from "@angular/common";
import {ListeMessagesComponent} from "../liste-messages/liste-messages.component";

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

export class NouveauMessageComponent implements OnInit{

  message!: Message;

  ngOnInit(): void {
    this.message = new Message();
  }

  // Ce qui se passe à la validation du formulaire de création d'un message
  onSubmit(form: NgForm) {
    //console.log(form.value);
    console.log(this.message);
    // A COMPLETER
  }

  /*
  // Exemple qui pourrait servir pour écrire onSubmit
  onSubmit() {
    this.http.post<any>(this.apiUrl, this.message).subscribe((data) => {
      console.log(data);
      this.posts = [];
      this.posts.push(data);
    });
  }
  */

}
