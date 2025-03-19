import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthentService} from './services/authent.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-authentification',
  templateUrl: './authent.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./authent.component.css']
})
export class AuthentComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthentService,
    private router: Router
  ) {
  }


  login(): void {
    const loginRequest = {username: this.username, password: this.password};
    this.authService.login(loginRequest).subscribe({
      next: (response: any) => {
        this.router.navigate(['/accueil'])
      },
      error: (error: any) => {
        console.error('Erreur de connexion:', error);
      }
    });
  }
}


