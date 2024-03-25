import { Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {User} from "../User";
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent{

  credentials = { id: '', motDePasse: '' };

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  //methode non utilisé pour le moment
  /*onLogin() {
    // Créez un objet User à partir des informations de connexion
    const userLogin: User = new User('', '', '', '', '', '','');

    userLogin.id = this.credentials.id;
    userLogin.motDePasse = this.credentials.motDePasse;

    this.userService.connexion(userLogin).subscribe(
      (res: any) => {
        if (res.result && res.data && res.data.token) {
          alert("Login Success");
          localStorage.setItem('angular17token', res.data.token);
          this.router.navigateByUrl('/blog');
        } else {
          alert(res.message);
        }
      },
      (error: any) => {
        console.error(error);
        alert("Une erreur s'est produite lors de la connexion.");
      }
    );
  }*/
  onLogin(): void {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        if (response.result && response.token) {
          alert("Connexion réussie");
          this.authService.saveToken(response.token);
          this.router.navigateByUrl('/profil');
        } else {
          alert(response.message);
        }
      },
      (error: any) => {
        console.error('Erreur de connexion:', error);
        alert("Une erreur s'est produite lors de la connexion.");
      }
    );
  }
  connexion() {
    // Créer un nouvel objet User avec l'email et l'ID du blog
    const user: User = {
      id: this.credentials.id, // L'ID peut être initialisé à 0 ou à une autre valeur par défaut
      nom: '', // Le nom peut être vide ou initialisé à une valeur par défaut
      prenom: '', // Le prénom peut être vide ou initialisé à une valeur par défaut
      email: '', // Utiliser l'email à partir de credentials
      telephone: '', // Le numéro de téléphone peut être vide ou initialisé à une valeur par défaut
      blogId: '', // Utiliser l'ID du blog à partir de credentials
      motDePasse :'',
    };

    // Appeler la méthode connexion du service UserService avec le nouvel utilisateur
    this.userService.connexion(user).subscribe(response => {
      console.log('Connexion réussie:', response);
      // Réinitialiser les données du formulaire après la connexion
      this.credentials = { id: '', motDePasse: '' };
      this.router.navigate(['/liste-messages']); // Rediriger vers la pge "liste-message"

    }, error => {
      console.error('Erreur de connexion:', error);
    });
  }


}
