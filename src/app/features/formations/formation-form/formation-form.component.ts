import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../services/formation.service';
import Formation from '../models/formation.interface';
import { NgForOf, NgIf } from '@angular/common';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { PopUpComponent } from '../../pop-up/pop-up.component';
import { UniteEnseignementService } from '../../unite-enseignement/services/unite-enseignement.service';
import { LocalisationService } from '../../localisation/services/localisation.service';
import { UniteEnseignement } from '../../unite-enseignement/models/unite-enseignement.interface';
import { Localisation } from '../../localisation/models/localisation.interface';

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
export class FormationFormComponent implements OnInit {

  formationForm!: Formation;
  uniteEnseignements: UniteEnseignement[] = [];
  localisations: Localisation[] = [];

  constructor(
    private formationService: FormationService,
    private router: Router,
    private route: ActivatedRoute,
    private uniteEnseignementService: UniteEnseignementService,
    private localisationService: LocalisationService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
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
        );
      } else {
        this.formationForm = this.getBlankFormation();
      }
    });

    this.uniteEnseignementService.getAll().subscribe(
      {
        next: (uniteEnseignements) => {
          this.uniteEnseignements = uniteEnseignements;
        },
        error: (err) => {
          console.error('Impossible de récupérer les unités d\'enseignement', err);
        }
      }
    );

    this.localisationService.getAll().subscribe(
      {
        next: (localisations) => {
          this.localisations = localisations;
        },
        error: (err) => {
          console.error('Impossible de récupérer les localisations', err);
        }
      }
    );
  }

  async valider() {
    this.formationForm.uniteEnseignementId = Number(this.formationForm.uniteEnseignementId);
    this.formationForm.localisationId = Number(this.formationForm.localisationId);
    this.formationService.save(this.formationForm);
    await this.attendre(500);
    this.router.navigate(['/formation']);
  }

  attendre(ms:number): Promise<void>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getBlankFormation(): Formation {
    return {
      libelleFormation: '',
      dateDebut: new Date(),
      dateFin: new Date(),
      uniteEnseignementId: 0,
      localisationId: 0,
      salleFormation: '',
      codeCours: '',
      formateursIds: [],
      stagiairesIds: [],
    };
  }

  annuler(): void {
    this.router.navigate(['/formation']);
  }

  // gestion Pop-up
  isValidationPopUpVisible = false;
  popUpContent = 'Voulez vous valider cette formation ?';

  showValidationPopUp(): void {
    this.isValidationPopUpVisible = true;
    this.popUpContent = `Voulez-vous valider " ${this.formationForm.libelleFormation} " ?`;
  }

  confirmValidation(): void {
    this.valider(); // Sauvegarde la formation
    this.isValidationPopUpVisible = false;
  }
}
