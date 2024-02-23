import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nouveau-message',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './nouveau-message.component.html',
  styleUrl: './nouveau-message.component.css'
})
export class NouveauMessageComponent {

}
