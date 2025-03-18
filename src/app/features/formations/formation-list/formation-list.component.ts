import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import Formation from './models/formation.interface';
import { FormationService } from './services/formation.service';
import { DatePipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formation-list',
  imports: [
    DatePipe,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './formation-list.component.html',
  styleUrl: './formation-list.component.css'
})
export class FormationListComponent {

  formations: Formation[];
  private _search: string = '';
  startDate: string = '';
  endDate: string = '';
  displayedCount: number = 0;
  diplomeFilter: string = '';

  constructor(private formationService: FormationService, private router: Router) {
    this.formations = formationService.getAll().map(formation => ({ ...formation, selected: false }));
    this.updateDisplayedCount();
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
      this.formationService.delete(id);
      this.formations = this.formationService.getAll();
      this.updateDisplayedCount();
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
}
