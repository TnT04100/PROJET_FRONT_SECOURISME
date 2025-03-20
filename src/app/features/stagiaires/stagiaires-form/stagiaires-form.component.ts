import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import Stagiaire from '../models/stagiaires.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {StagiairesService} from '../services/stagiaires.service';
import {MenuComponent} from "../../../shared/menu/menu.component";
import {PopUpComponent} from '../../pop-up/pop-up.component';

@Component({
  selector: 'app-stagiaires-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    MenuComponent,
    PopUpComponent,
    NgIf
  ],
  templateUrl: './stagiaires-form.component.html',
  styleUrl: './stagiaires-form.component.css'
})
export class StagiairesFormComponent {


  civilite: String[] = [
    'MONSIEUR',
    'MADAME',
    'AUTRE',

  ]

  stagiaireForm!: Stagiaire

  constructor(
    private stagiaireService: StagiairesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.stagiaireService.getById(parseInt(id)).subscribe(
          {
            next: formateur => {
              this.stagiaireForm = formateur;
            },
            error: err => {
              this.stagiaireForm = this.getBlankStagiaire();
              console.error('Impossible de récupérer le formateur', err);
            }
          }
        )
      } else {
        this.stagiaireForm = this.getBlankStagiaire();
      }
    })
  }

  valider(): void{
    this.stagiaireService.save(this.stagiaireForm)
    this.router.navigate(['/stagiaire'])
  }

  private getBlankStagiaire(): Stagiaire {
    return <Stagiaire>{
      numeroIdentifiantDefense: '',
      nom: '',
      prenom: '',
      civilite: 'MONSIEUR',
      dateDeNaissance: new Date(),
      villeDeNaissance: '',
      grade:'Adjudant',
      uniteId:0
    };
  }

  annuler() {
    this.router.navigate(['/stagiaire'])
  }

  // gestion Pop-up
  isValidationPopUpVisible = false;
  popUpContent = 'Voulez vous valider cette formation ?';

  showValidationPopUp() {
    this.isValidationPopUpVisible = true;
    this.popUpContent = `Voulez-vous valider la création de
                        ${this.stagiaireForm.nom}"
                        ${this.stagiaireForm.prenom}
                        ayant le NID :
                        ${this.stagiaireForm.numeroIdentifiantDefense} " ?`;
  }

  confirmValidation() {
    this.valider(); // Sauvegarde la formation
    this.isValidationPopUpVisible = false;
  }
}
