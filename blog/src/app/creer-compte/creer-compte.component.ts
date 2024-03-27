import { Component,OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {Router,RouterLink} from "@angular/router";
import { UserService } from '../user.service';
import { User } from '../User';
import {NgIf} from "@angular/common";
import {response} from "express";

@Component({
  selector: 'app-creer-compte',
  standalone: true,
  imports: [FormsModule,
    HttpClientModule,
    RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './creer-compte.component.html',
  styleUrl: './creer-compte.component.css'
})
export class CreerCompteComponent {
  newUserForm: FormGroup;
  successMessage: string = ''; // notification creation de compte reussi
  errorMessage: string = ''; // notification erreur lors de la creation du compte
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    // Initialisation du formulaire avec les champs requis
    this.newUserForm = this.formBuilder.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      blogId: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }
// Méthode pour créer un nouveau compte utilisateur
  creerCompte() {
    const newUser: User = this.newUserForm.value as User;
    console.log('Nouvel utilisateur à créer :', newUser);

    this.userService.createUser(newUser).subscribe( response => {

        this.successMessage = 'Compte créé avec succès!';
        console.log('Réponse du serveur après création de compte :', response); // Ajouter un log pour afficher la réponse du serveur
        this.newUserForm.reset(); // Réinitialiser le formulaire après la création de compte
        // Redirection vers la page liste-messages
        this.router.navigate(['/liste-messages']);
      },
      error => {
        this.errorMessage = 'Erreur lors de la création du compte.';
        console.error('Erreur lors de la création du compte :', error); // Ajouter un log pour afficher les erreur
      }
    );
  }

}


