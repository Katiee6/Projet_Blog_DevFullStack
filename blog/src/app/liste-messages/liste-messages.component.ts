import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MessagesService} from "../messages.service";
import {Message} from '../Message';

@Component({
  selector: 'app-liste-messages',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './liste-messages.component.html',
  styleUrl: './liste-messages.component.css'
})

export class ListeMessagesComponent implements OnInit{

  // Liste des messages
  liste: Message[] = [];

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messagesService.obtenirliste().subscribe((data) => {
      this.liste = data
    });
  }

}
