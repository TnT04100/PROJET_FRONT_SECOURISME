import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../formation-list/services/formation.service';
import Formation from '../formation-list/models/formation.interface';
import {Diplome} from '../formation-list/models/diplome.type';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-formation-form',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './formation-form.component.html',
  styleUrl: './formation-form.component.css'
})
export class FormationFormComponent {

  diplome: String[] = [
    'PSC1' ,
    'PS' ,
    'SC1' ,
    'SC2' ,
    'SC3'
  ]


  formationForm!: Formation


  constructor(
    private formationService: FormationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.formationForm = this.formationService.getById(parseInt(id)) ?? this.getBlankFormation()
      } else {
        this.formationForm = this.getBlankFormation()
      }
    })
  }


  valider(): void {
    this.formationService.save(this.formationForm)
    this.router.navigate(['/formation'])
  }

  private getBlankFormation() {
    let psc: Diplome = 'PSC1'
    return {
      name: '',
      dateDebut: new Date(),
      dateFin: new Date(),
      diplome: psc

    };
  }

  annuler() {
    this.router.navigate(['/formation'])
  }
}


