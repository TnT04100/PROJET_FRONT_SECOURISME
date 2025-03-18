import { Component } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import Stagiaire from '../../stagiaires/models/stagiaires.interface';
import {StagiairesService} from '../../stagiaires/services/stagiaires.service';
import Formateurs from '../models/formateurs.interface';
import {FormsModule} from '@angular/forms';
import {FormateursService} from '../services/formateurs.service';

@Component({
  selector: 'app-formateur-list',
  imports: [
    DatePipe,
    RouterLink,
    NgForOf,
    FormsModule
  ],
  templateUrl: './formateur-list.component.html',
  styleUrl: './formateur-list.component.css'
})
export class FormateurListComponent {

  formateur: Formateurs[];
  private _search: string = '';
  nidFilter: string = '';
  civiliteFilter: string = '';
  nomFilter: string = '';
  prenomFilter: string = '';
  dateNaissanceFilter: string = '';
  villeNaissanceFilter: string = '';
  displayedCount: number = 0;

  constructor(private formationService: FormateursService) {
    this.formateur = formationService.getAll();
    this.updateDisplayedCount();
  }

  updateDisplayedCount(): void {
    this.displayedCount = this.filteredFormateurs.length;
  }

  delete(id: number | undefined): void {
    if (id) {
      this.formationService.delete(id);
      this.formateur = this.formationService.getAll();
      this.updateDisplayedCount();
    }
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
  }

  get filteredFormateurs(): Formateurs[] {
    return this.formateur.filter(formateur => {
      const matchesNID = formateur.NID.toLowerCase().includes(this.nidFilter.toLowerCase());
      const matchesCivilite = !this.civiliteFilter || formateur.civilite === this.civiliteFilter;
      const matchesNom = formateur.nom.toLowerCase().includes(this.nomFilter.toLowerCase());
      const matchesPrenom = formateur.prenom.toLowerCase().includes(this.prenomFilter.toLowerCase());
      const matchesDateNaissance = !this.dateNaissanceFilter || new Date(formateur.dateNaissance).toISOString().split('T')[0] === this.dateNaissanceFilter;
      const matchesVilleNaissance = formateur.villeNaissance.toLowerCase().includes(this.villeNaissanceFilter.toLowerCase());
      return matchesNID && matchesCivilite && matchesNom && matchesPrenom && matchesDateNaissance && matchesVilleNaissance;
    });
  }
}
