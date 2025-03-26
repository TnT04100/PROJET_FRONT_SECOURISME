import { Component } from '@angular/core';
import Stagiaire from '../models/stagiaires.interface';
import {StagiairesService} from '../services/stagiaires.service';

@Component({
  selector: 'app-stagiaires-add',
  imports: [],
  templateUrl: './stagiaires-add.component.html',
  styleUrl: './stagiaires-add.component.css'
})
export class StagiairesAddComponent {

  stagiaires: Stagiaire[] = [];

  constructor(private stagiaireService: StagiairesService) {
    this.getStagiaires();
  }

  getStagiaires(): void {
    this.stagiaireService.getAll().subscribe(
      stagiaire => {
        this.stagiaires = stagiaire;
      },
      error => {
        console.error('Error fetching stagiaires', error);
      }
    );
  }

}
