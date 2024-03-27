import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

 // profileDetails: UserResponseDto;

  //constructor(public authenticate: AuthenticationService, public adminService:AdminService) { }

  }

