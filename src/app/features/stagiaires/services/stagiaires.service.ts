import {Injectable} from '@angular/core';

import {Civilite} from '../models/civilite.type';
import Stagiaire from '../models/stagiaires.interface';
import Formation from '../../formations/formation-list/models/formation.interface';

@Injectable({
  providedIn: 'root'
})
export class StagiairesService {

  private stagiaire: Stagiaire[] = [
    {
      id: 1,
      NID: '1234',
      nom: 'Verstappen',
      prenom: 'Max',
      dateNaissance: new Date(),
      villeNaissance: 'Hasselt',
      civilite: 'M'

    },
    {
      id: 2,
      NID: '5678',
      nom: 'Hamilton',
      prenom: 'Lewis',
      dateNaissance: new Date(),
      villeNaissance: 'Stevenage',
      civilite: 'M'
    },
    {
      id: 3,
      NID: '91011',
      nom: 'Leclerc',
      prenom: 'Charles',
      dateNaissance: new Date(),
      villeNaissance: 'Monte Carlo',
      civilite: 'M'
    },
    {
      id: 4,
      NID: '121314',
      nom: 'Norris',
      prenom: 'Lando',
      dateNaissance: new Date(),
      villeNaissance: 'Bristol',
      civilite: 'M'

    }

  ];

  constructor() {

  }

  getAll(): Stagiaire[] {
    return this.stagiaire;
  }

  getById(id: number): Stagiaire | undefined {
    return this.stagiaire.find(stagiaire => stagiaire.id === id);
  }

  save(stagiaire: Stagiaire): void {
    if (!stagiaire) {
      return;
    }
    if (stagiaire.id) {
      const index = this.stagiaire.findIndex(s => s.id === stagiaire.id);
      if (index !== -1) {
        this.stagiaire[index] = {...stagiaire};
      }
    } else {
      stagiaire.id = this.getLastId() + 1;
      this.stagiaire.push({...stagiaire});
    }
  }



  delete(id: number): void {
    this.stagiaire = this.stagiaire.filter(stagiaire => stagiaire.id !== id);
  }


  private getLastId() {
    //2eme facon de coder cette methode
    return this.stagiaire.length > 0 ? Math.max(...this.stagiaire.map(stagiaire => stagiaire.id ?? 0)) : 0;
  }
}
