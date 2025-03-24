import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import Formation from './models/formation.interface';
import { FormationService } from './services/formation.service';
import { DatePipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MenuComponent} from '../../../shared/menu/menu.component';
import {PopUpComponent} from '../../pop-up/pop-up.component';

@Component({
  selector: 'app-formation-list',
  imports: [
    DatePipe,
    NgForOf,
    FormsModule,
    RouterLink,
    MenuComponent,
    PopUpComponent
  ],
  templateUrl: './formation-list.component.html',
  styleUrl: './formation-list.component.css'
})
export class FormationListComponent {

  formations: Formation[] = [];
  private _search: string = '';
  startDate: string = '';
  endDate: string = '';
  displayedCount: number = 0;
  diplomeFilter: string = '';

  constructor(private formationService: FormationService, private router: Router) {
    this.getFormations();
    this.updateDisplayedCount();
  }

  getFormations(): void {
    this.formationService.getAll().subscribe(
      formations => {
        this.formations = formations;
        this.updateDisplayedCount();
      },
      error => {
        console.error('Error fetching formateurs', error);
      }
    );
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
  }

  updateDisplayedCount(): void {
    this.displayedCount = this.filteredFormations.length;
  }

  delete(id: number | undefined): void {
    if (id) {
      this.formationService.delete(id).subscribe(
        {
          next:() => { this.getFormations();}
        }
      );
      this.formationService.getAll();
    }
  }

  get filteredFormations(): Formation[] {
    return this.formations.filter(formation => {
      const matchesSearch = formation.name.toLowerCase().includes(this.search.toLowerCase());
      const matchesStartDate = !this.startDate || new Date(formation.dateDebut).toISOString().split('T')[0] === this.startDate;
      const matchesEndDate = !this.endDate || new Date(formation.dateFin).toISOString().split('T')[0] === this.endDate;
      const matchesDiplome = !this.diplomeFilter || formation.diplome === this.diplomeFilter;
      return matchesSearch && matchesStartDate && matchesEndDate && matchesDiplome;
    });
  }


  showSelectedDetails(): void {
    const selectedFormation = this.formations.find(formation => formation.selected);
    if (selectedFormation && selectedFormation.id) {
      this.router.navigate(['/formation/details', selectedFormation.id]);
    } else {
      alert('Veuillez sélectionner une formation.');
    }
  }

// gestion Pop-up
  isPopUpVisible = false;
  popUpTitle = 'Supression de la formation';
  popUpContent = 'Voulez vous supprimer cette formation ?';
  formationToDelete: any;

  showDeleteConfirmation(formation: Formation) {
    this.formationToDelete = formation;
    this.popUpContent = `Voulez-vous supprimer " ${formation.name} " ?`;
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

  // Pop-up Detail
  isDetailPopUpVisible = false;
  formationToShow: Formation | undefined;

  // Gestion Pop-up pour les détails
  showDetails(formation: Formation) {
    this.formationToShow = formation;
    this.popUpContent = `
    <p><strong>ID :</strong> ${formation.id}</p><br>
    <p><strong>Nom :</strong> ${formation.name}</p><br>
    <p><strong>Type de formation :</strong> ${formation.diplome}</p><br>
    <p><strong>Date de début :</strong> ${new Date(formation.dateDebut).toLocaleDateString()}</p><br>
    <p><strong>Date de fin :</strong> ${new Date(formation.dateFin).toLocaleDateString()}</p>
  `;
    this.isDetailPopUpVisible = true;
  }

  // Fermer la pop-up des détails
  hideDetailPopUp() {
    this.isDetailPopUpVisible = false;
  }
}
