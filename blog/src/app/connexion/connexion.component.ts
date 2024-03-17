import { Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

  loginObj: Login;

  constructor(private http: HttpClient,private router: Router) {
    this.loginObj = new Login();
  }

  /*
  onLogin() {
    debugger;
    this.http.post('http://localhost:5500/connexion', this.loginObj).subscribe((res:any)=>{
      if(res.result) {
        alert("Login Success");
        localStorage.setItem('angular17token', res.data.token)
        this.router.navigateByUrl('/blog')
      } else {
        alert(res.message)
      }
    })
  }
  */
  onLogin() {
    this.http.post('http://localhost:5500/connexion', this.loginObj).subscribe((res:any) => {
      if(res.result && res.data && res.data.token) {
        alert("Login Success");
        localStorage.setItem('angular17token', res.data.token)
        this.router.navigateByUrl('/blog')
      } else {
        alert(res.message)
      }
    }, error => {
      console.error(error); // Affiche les détails de l'erreur HTTP dans la console
      alert("Une erreur s'est produite lors de la connexion.");
    });
  }

}

export class Login {
  EmailId: string;
  Password: string;
  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}
