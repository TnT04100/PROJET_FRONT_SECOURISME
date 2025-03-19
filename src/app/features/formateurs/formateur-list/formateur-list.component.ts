import { Component } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import Stagiaire from '../../stagiaires/models/stagiaires.interface';
import {StagiairesService} from '../../stagiaires/services/stagiaires.service';
import Formateurs from '../models/formateurs.interface';
import {FormsModule} from '@angular/forms';
import {FormateursService} from '../services/formateurs.service';
import {MenuComponent} from "../../../shared/menu/menu.component";

@Component({
  selector: 'app-formateur-list',
    imports: [
        DatePipe,
        RouterLink,
        NgForOf,
        FormsModule,
        MenuComponent
    ],
  templateUrl: './formateur-list.component.html',
  styleUrl: './formateur-list.component.css'
})
export class FormateurListComponent {

  formateur: Formateurs[]= [];
  private _search: string = '';
  nidFilter: string = '';
  civiliteFilter: string = '';
  nomFilter: string = '';
  prenomFilter: string = '';
  dateNaissanceFilter: string = '';
  villeNaissanceFilter: string = '';
  displayedCount: number = 0;

  constructor(private formateurService: FormateursService) {
    this.getFormateurs();
    this.updateDisplayedCount();
  }
  getFormateurs(): void {
    this.formateurService.getAll().subscribe(
      formateurs => {
        this.formateur = formateurs;
        this.updateDisplayedCount();
      },
      error => {
        console.error('Error fetching formateurs', error);
      }
    );
  }

  updateDisplayedCount(): void {
    this.displayedCount = this.filteredFormateurs.length;
  }

  delete(id: number | undefined): void {
    if (id) {
      this.formateurService.delete(id);
      {
        next:()=> {this.getFormateurs()};
      }
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
      const matchesNID = formateur.numeroIdentifiantDefense?.toLowerCase().includes(this.nidFilter.toLowerCase());
      const matchesCivilite = !this.civiliteFilter || formateur.civilite === this.civiliteFilter;
      const matchesNom = formateur.nom.toLowerCase().includes(this.nomFilter.toLowerCase());
      const matchesPrenom = formateur.prenom.toLowerCase().includes(this.prenomFilter.toLowerCase());
      const matchesDateNaissance = !this.dateNaissanceFilter || new Date(formateur.dateDeNaissance).toISOString().split('T')[0] === this.dateNaissanceFilter;
      const matchesVilleNaissance = formateur.villeDeNaissance.toLowerCase().includes(this.villeNaissanceFilter.toLowerCase());
      return matchesNID && matchesCivilite && matchesNom && matchesPrenom && matchesDateNaissance && matchesVilleNaissance;
    });
  }
}
