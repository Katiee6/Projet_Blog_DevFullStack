import {Component, OnInit} from '@angular/core';
import {Message} from "../Message";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

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

  liste: Message[] = [];

  ngOnInit(): void {
    // /!\ Pour le test seulement
    const m1 = new Message();
    m1.titre = "Titre 1";
    m1.contenu = "Contenu 1"
    this.liste.push(m1);

    const m2 = new Message();
    m2.titre = "Titre 2";
    m2.contenu = "Contenu 2"
    this.liste.push(m2);

    const m3 = new Message();
    m3.titre = "Titre 3";
    m3.contenu = "Contenu 3"
    this.liste.push(m3);
  }

}
