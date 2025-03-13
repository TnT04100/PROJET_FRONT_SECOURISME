import { Component } from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import Stagiaire from '../models/stagiaires.interface';
import {StagiairesService} from '../services/stagiaires.service';

@Component({
  selector: 'app-stagiaires-list',
  imports: [
    DatePipe,
    RouterLink,
    NgForOf
  ],
  templateUrl: './stagiaires-list.component.html',
  styleUrl: './stagiaires-list.component.css'
})
export class StagiairesListComponent {

  stagiaires: Stagiaire[];

  constructor(private formationService: StagiairesService) {
    this.stagiaires = formationService.getAll()
  }


  delete(id: number | undefined): void {
    if (id) {
      this.formationService.delete(id)
      this.stagiaires = this.formationService.getAll()
    }
  }


  addParticipant(id: number | undefined) {

  }
}
