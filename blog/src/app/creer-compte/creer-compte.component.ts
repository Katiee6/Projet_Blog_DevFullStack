import { Component } from '@angular/core';
import {FormsModule, FormGroup, FormBuilder} from "@angular/forms";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {Router,RouterLink} from "@angular/router";

@Component({
  selector: 'app-creer-compte',
  standalone: true,
  imports: [ FormsModule,
    HttpClientModule,
    RouterLink],
  templateUrl: './creer-compte.component.html',
  styleUrl: './creer-compte.component.css'
})
export class CreerCompteComponent {

}
