import { Component } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import Stagiaire from '../models/stagiaires.interface';
import { StagiairesService } from '../services/stagiaires.service';
import { FormsModule } from "@angular/forms";
import {MenuComponent} from "../../../shared/menu/menu.component";

@Component({
  selector: 'app-stagiaires-list',
    imports: [
        DatePipe,
        RouterLink,
        NgForOf,
        FormsModule,
        MenuComponent
    ],
  templateUrl: './stagiaires-list.component.html',
  styleUrl: './stagiaires-list.component.css'
})
export class StagiairesListComponent {

  stagiaires: Stagiaire[];
  private _search: string = '';
  nidFilter: string = '';
  civiliteFilter: string = '';
  nomFilter: string = '';
  prenomFilter: string = '';
  dateNaissanceFilter: string = '';
  villeNaissanceFilter: string = '';
  displayedCount: number = 0;

  constructor(private stagiairesService: StagiairesService) {
    this.stagiaires = stagiairesService.getAll();
    this.updateDisplayedCount();
  }

  updateDisplayedCount(): void {
    this.displayedCount = this.filteredStagiaires.length;
  }

  delete(id: number | undefined): void {
    if (id) {
      this.stagiairesService.delete(id);
      this.stagiaires = this.stagiairesService.getAll();
      this.updateDisplayedCount();
    }
  }

  get filteredStagiaires(): Stagiaire[] {
    return this.stagiaires.filter(stagiaires => {
      const matchesNID = stagiaires.NID.toLowerCase().includes(this.nidFilter.toLowerCase());
      const matchesCivilite = !this.civiliteFilter || stagiaires.civilite === this.civiliteFilter;
      const matchesNom = stagiaires.nom.toLowerCase().includes(this.nomFilter.toLowerCase());
      const matchesPrenom = stagiaires.prenom.toLowerCase().includes(this.prenomFilter.toLowerCase());
      const matchesDateNaissance = !this.dateNaissanceFilter || new Date(stagiaires.dateNaissance).toISOString().split('T')[0] === this.dateNaissanceFilter;
      const matchesVilleNaissance = stagiaires.villeNaissance.toLowerCase().includes(this.villeNaissanceFilter.toLowerCase());
      return matchesNID && matchesCivilite && matchesNom && matchesPrenom && matchesDateNaissance && matchesVilleNaissance;
    });
  }
}
