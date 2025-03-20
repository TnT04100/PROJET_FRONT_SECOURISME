import { Component } from '@angular/core';
import { DatePipe, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import Stagiaire from '../models/stagiaires.interface';
import { StagiairesService } from '../services/stagiaires.service';
import { FormsModule } from "@angular/forms";
import {MenuComponent} from "../../../shared/menu/menu.component";
import {PopUpComponent} from '../../pop-up/pop-up.component';
import Formateurs from '../../formateurs/models/formateurs.interface';
import {FormateursService} from '../../formateurs/services/formateurs.service';

@Component({
  selector: 'app-stagiaires-list',
  imports: [
    DatePipe,
    RouterLink,
    NgForOf,
    FormsModule,
    MenuComponent,
    PopUpComponent
  ],
  templateUrl: './stagiaires-list.component.html',
  styleUrl: './stagiaires-list.component.css'
})
export class StagiairesListComponent {

  stagiaires: Stagiaire[] = [];

  private _search: string = '';
  nidFilter: string = '';
  civiliteFilter: string = '';
  nomFilter: string = '';
  prenomFilter: string = '';
  dateNaissanceFilter: string = '';
  villeNaissanceFilter: string = '';
  displayedCount: number = 0;

  constructor(private stagiaireService: StagiairesService) {
    this.getStagiaires();
    this.updateDisplayedCount();
  }

  getStagiaires(): void {
    this.stagiaireService.getAll().subscribe(
      stagiaire => {
        this.stagiaires = stagiaire;
        this.updateDisplayedCount();
      },
      error => {
        console.error('Error fetching stagiaires', error);
      }
    );
  }

  updateDisplayedCount(): void {
    this.displayedCount = this.filteredStagiaires.length;
  }

  delete(id: number | undefined): void {
    if (id) {
      this.stagiaireService.delete(id).subscribe(
        {
          next:() => { this.getStagiaires();}
        }
      );
      this.stagiaireService.getAll();
    }
  }

  get filteredStagiaires(): Stagiaire[] {
    return this.stagiaires.filter(stagiaires => {
      const matchesNID = stagiaires.numeroIdentifiantDefense.toLowerCase().includes(this.nidFilter.toLowerCase());
      const matchesCivilite = !this.civiliteFilter || stagiaires.civilite === this.civiliteFilter;
      const matchesNom = stagiaires.nom.toLowerCase().includes(this.nomFilter.toLowerCase());
      const matchesPrenom = stagiaires.prenom.toLowerCase().includes(this.prenomFilter.toLowerCase());
      const matchesDateNaissance = !this.dateNaissanceFilter || new Date(stagiaires.dateDeNaissance).toISOString().split('T')[0] === this.dateNaissanceFilter;
      const matchesVilleNaissance = stagiaires.villeDeNaissance.toLowerCase().includes(this.villeNaissanceFilter.toLowerCase());
      return matchesNID && matchesCivilite && matchesNom && matchesPrenom && matchesDateNaissance && matchesVilleNaissance;
    });
  }


// gestion Pop-up
  isPopUpVisible = false;
  popUpTitle = 'Supression du Stagiaire';
  popUpContent = 'Voulez-vous supprimer ce stagiaire ?';
  formationToDelete: any;

  showDeleteConfirmation(stagiaire: Stagiaire) {
    this.formationToDelete = stagiaire;
    this.popUpContent = `Voulez-vous supprimer le stagiaire ${stagiaire.nom} ${stagiaire.prenom} ?`;
    this.isPopUpVisible = true;
  }

  hidePopUp() {
    this.isPopUpVisible = false;
  }

  confirmDeletion() {
    if (this.formationToDelete && this.formationToDelete.id) {
      this.delete(this.formationToDelete.id);
      this.isPopUpVisible = false;
    }
  }
}
