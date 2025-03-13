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

  constructor(private formationService: FormationService, private router: Router) {
    this.formations = formationService.getAll().map(formation => ({ ...formation, selected: false }));
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
  }

  get filteredFormations(): Formation[] {
    return this.formations.filter(formation =>
      formation.name.toLowerCase().includes(this._search.toLowerCase())
    );
  }

  delete(id: number | undefined): void {
    if (id) {
      this.formationService.delete(id);
      this.formations = this.formationService.getAll().map(formation => ({ ...formation, selected: false }));
    }
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
