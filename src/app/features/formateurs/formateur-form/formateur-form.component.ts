import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import Stagiaire from '../../stagiaires/models/stagiaires.interface';
import {StagiairesService} from '../../stagiaires/services/stagiaires.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../../formations/formation-list/services/formation.service';
import {FormateursService} from '../services/formateurs.service';
import Formateurs from '../models/formateurs.interface';
import {MenuComponent} from "../../../shared/menu/menu.component";
import {PopUpComponent} from '../../pop-up/pop-up.component';

@Component({
  selector: 'app-formateur-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    MenuComponent,
    PopUpComponent,
    NgIf
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
        this.formateursService.getById(parseInt(id)).subscribe(
          {
            next: formateur => {
              this.formateursForm = formateur;
            },
            error: err => {
              this.formateursForm = this.getBlankFormateur();
              console.error('Impossible de récupérer le formateur', err);
            }
          }
        )
      } else {
        this.formateursForm = this.getBlankFormateur()
      }
    })
  }

  valider(): void{
    this.formateursService.save(this.formateursForm)
    this.router.navigate(['/formateur'])
  }

  private getBlankFormateur(): Formateurs {
    return <Formateurs>{
      numeroIdentifiantDefense: '',
      nom: '',
      prenom: '',
      civilite: 'MONSIEUR',
      dateDeNaissance: new Date(),
      villeDeNaissance: '',
      uniteId: 0,
      grade: 'Adjudant'
    };
  }

  annuler() {
    this.router.navigate(['/formateur'])
  }


// gestion Pop-up
  isValidationPopUpVisible = false;
  popUpContent = 'Voulez vous valider cette formation ?';

  showValidationPopUp() {
    this.isValidationPopUpVisible = true;
    this.popUpContent = `Voulez-vous valider la création de
                        ${this.formateursForm.nom}"
                        ${this.formateursForm.prenom}
                        ayant le NID :
                        ${this.formateursForm.numeroIdentifiantDefense} " ?`;
  }

  confirmValidation() {
    this.valider(); // Sauvegarde la formation
    this.isValidationPopUpVisible = false;
  }
}
