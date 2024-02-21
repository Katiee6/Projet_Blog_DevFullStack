import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  id: string = "";
  titre: string = "";
  contenu: string = "";
  date: Date = new Date();
}
