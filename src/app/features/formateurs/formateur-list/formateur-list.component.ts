import { Component } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import Stagiaire from '../../stagiaires/models/stagiaires.interface';
import {StagiairesService} from '../../stagiaires/services/stagiaires.service';
import Formateurs from '../models/formateurs.interface';
import {FormsModule} from '@angular/forms';
import Formation from '../../formations/formation-list/models/formation.interface';

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

  constructor(private formationService: StagiairesService) {
    this.formateur = formationService.getAll()
  }


  delete(id: number | undefined): void {
    if (id) {
      this.formationService.delete(id)
      this.formateur = this.formationService.getAll()
    }
  }


  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
  }

  get filteredFormateurs(): Formateurs[] {
    return this.formateur.filter(formateur =>
      formateur.nom.toLowerCase().includes(this._search.toLowerCase())
    );
  }
}
