import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from "@angular/common";
import Stagiaire from '../../stagiaires/models/stagiaires.interface';
import {StagiairesService} from '../../stagiaires/services/stagiaires.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../../formations/formation-list/services/formation.service';
import {FormateursService} from '../services/formateurs.service';
import Formateurs from '../models/formateurs.interface';

@Component({
  selector: 'app-formateur-form',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgForOf
    ],
  templateUrl: './formateur-form.component.html',
  styleUrl: './formateur-form.component.css'
})
export class FormateurFormComponent {

  civilite: String[] = [
    'M',
    'Mme',
    'autre',

  ]

  formateursForm!: Formateurs

  constructor(
    private formateursService: FormateursService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.formateursForm = this.formateursService.getById(parseInt(id)) ?? this.getBlankFormateur()
      } else {
        this.formateursForm = this.getBlankFormateur()
      }
    })
  }

  valider(): void{
    this.formateursService.save(this.formateursForm)
    this.router.navigate(['/formateur'])
  }

  private getBlankFormateur(): Stagiaire {
    return {
      NID: '',
      nom: '',
      prenom: '',
      civilite: 'M',
      dateNaissance: new Date(),
      villeNaissance: ''


    };
  }

  annuler() {
    this.router.navigate(['/formateur'])
  }
}
