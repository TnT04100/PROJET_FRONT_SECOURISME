import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../formation-list/services/formation.service';
import Formation from '../formation-list/models/formation.interface';
import {Diplome} from '../formation-list/models/diplome.type';
import {NgForOf, NgIf} from '@angular/common';
import {MenuComponent} from "../../../shared/menu/menu.component";
import {PopUpComponent} from '../../pop-up/pop-up.component';
import {FormateursService} from '../../formateurs/services/formateurs.service';
import Formateurs from '../../formateurs/models/formateurs.interface';
import Stagiaire from '../../stagiaires/models/stagiaires.interface';

@Component({
  selector: 'app-formation-form',
  imports: [
    FormsModule,
    NgForOf,
    MenuComponent,
    PopUpComponent,
    NgIf,
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
        this.formationService.getById(parseInt(id)).subscribe(
          {
            next: formation => {
              this.formationForm = formation;
            },
            error: err => {
              this.formationForm = this.getBlankFormation();
              console.error('Impossible de récupérer le formateur', err);
            }
          }
        )
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
      libelle: '',
      dateDebut: new Date(),
      dateFin: new Date(),
      diplome: psc,
      salleFormation: '',
      codeCours: '',
      formateur: [],
      stagiaires: [],
    };
  }

  annuler() {
    this.router.navigate(['/formation'])
  }


// gestion Pop-up
  isValidationPopUpVisible = false;
  popUpContent = 'Voulez vous valider cette formation ?';

  showValidationPopUp() {
    this.isValidationPopUpVisible = true;
    this.popUpContent = `Voulez-vous valider " ${this.formationForm.libelle} " ?`;
  }

  confirmValidation() {
    this.valider(); // Sauvegarde la formation
    this.isValidationPopUpVisible = false;
  }


}


