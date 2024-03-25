import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  currentUser: User;
  profilForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.currentUser = new User('', '', '', '', '', '', '');
    this.profilForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      blogId: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  //pop-up succees notification
  showSuccessMessage(message: string): void {
    alert(message);
  }

  ngOnInit(): void {
    this.getProfile();
  }

  /*
  getProfile(): void {
    this.loading = true;
    const token = localStorage.getItem('token');

    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + token
        })
      };

      this.http.get<User>('/profil', httpOptions)
        .pipe(
          catchError(error => {
            this.errorMessage = 'Erreur lors de la récupération du profil';
            return throwError(error);
          })
        )
        .subscribe(
          (user: User) => {
            console.log('Données du profil récupérées avec succès :', user);
            this.currentUser = user;
            this.updateFormValues();
          },
          error => {
            console.error('Erreur lors de la récupération du profil :', error);
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
    } else {
      console.log('Aucun jeton JWT trouvé.');
      this.loading = false;
    }
  }
*/
  getProfile(): void {
    this.http.get<any>('/profil', { headers: this.authService.getAuthorizationHeaders() }).subscribe(
      response => {
        this.currentUser = response;
      },
      error => {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    );
  }
  updateFormValues(): void {
    this.profilForm.patchValue({
      nom: this.currentUser.nom,
      prenom: this.currentUser.prenom,
      email: this.currentUser.email,
      telephone: this.currentUser.telephone,
      blogId: this.currentUser.blogId,
      motDePasse: this.currentUser.motDePasse
    });
  }

  updateProfile(): void {
    if (this.profilForm.invalid) {
      return;
    }
    this.loading = true;
    const updatedUser: User = this.profilForm.value;
    updatedUser.id = this.currentUser.id;
    this.userService.updateProfile(updatedUser)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Erreur lors de la mise à jour du profil utilisateur';
          return throwError(error);
        })
      )
      .subscribe(
        () => {
          console.log('Profil utilisateur mis à jour avec succès');
          this.showSuccessMessage('Profil utilisateur mis à jour avec succès');
          this.loading = false;
        },
        error => {
          console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
          this.loading = false;
        }
      );
  }

  /*loadCurrentUser(): void {
  this.userService.getCurrentUser().subscribe(
    (user: User) => {
      this.currentUser = user;
      this.updateFormValues();
    },
    error => {
      console.error('Erreur lors du chargement des données de l\'utilisateur:', error);
    }
  );
}*/
  confirmDeleteAccount(): void {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');
    if (confirmation) {
      this.deleteAccount();
    }
  }

  deleteAccount(): void {
    this.loading = true;
    this.userService.deleteUser(this.currentUser.id)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Erreur lors de la suppression du compte utilisateur';
          return throwError(error);
        })
      )
      .subscribe(
        () => {
          console.log('Compte utilisateur supprimé avec succès');
          this.loading = false;
        },
        error => {
          console.error('Erreur lors de la suppression du compte utilisateur:', error);
          this.loading = false;
        }
      );
  }

}
