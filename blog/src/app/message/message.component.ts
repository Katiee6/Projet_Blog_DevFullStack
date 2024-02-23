import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './message.component.css'
})
export class MessageComponent {
  id: string = "";
  @Input() titre: string;
  @Input() contenu: string;
  @Input() date: Date;

  constructor() {
    this.titre = "Test Title";
    this.contenu = "Test Content";
    this.date = new Date();
  }
}

