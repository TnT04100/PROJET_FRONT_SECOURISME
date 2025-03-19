import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgForOf} from "@angular/common";
import Stagiaire from '../models/stagiaires.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {StagiairesService} from '../services/stagiaires.service';
import {MenuComponent} from "../../../shared/menu/menu.component";

@Component({
  selector: 'app-stagiaires-form',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgForOf,
        MenuComponent
    ],
  templateUrl: './stagiaires-form.component.html',
  styleUrl: './stagiaires-form.component.css'
})
export class StagiairesFormComponent {


  civilite: String[] = [
    'M',
    'Mme',
    'autre',

  ]

  stagiaireForm!: Stagiaire

  constructor(
    private stagiaireService: StagiairesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id){
        this.stagiaireForm = this.stagiaireService.getById(parseInt(id)) ?? this.getBlankDino()
      }else{
        this.stagiaireForm = this.getBlankDino()
      }
    })
  }

  valider(): void{
    this.stagiaireService.save(this.stagiaireForm)
    this.router.navigate(['/stagiaire'])
  }

  private getBlankDino(): Stagiaire {
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
    this.router.navigate(['/stagiaire'])
  }
}
