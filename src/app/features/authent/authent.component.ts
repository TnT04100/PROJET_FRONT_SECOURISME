import {Component, OnInit} from '@angular/core';
import { AuthentService } from './authent.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-authentification',
  templateUrl: './authent.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./authent.component.css']
})
export class AuthentComponent implements OnInit{
    identifiant: string;
    motDePasse: string;

  constructor(private authService: AuthentService) {
    this.identifiant = '';
    this.motDePasse = '';
  }

  connexion() {
    this.authService.login(this.identifiant, this.motDePasse).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        // Redirigez l'utilisateur ou faites quelque chose avec la réponse
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }

  ngOnInit(): void {
  }
}

