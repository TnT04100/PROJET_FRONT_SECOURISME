import {Injectable} from '@angular/core';

import {Civilite} from '../models/civilite.type';
import Stagiaire from '../models/formateurs.interface';
import Formateurs from '../models/formateurs.interface';

@Injectable({
  providedIn: 'root'
})
export class FormateursService {

  private formateurs: Formateurs[] = [
    {
      id: 1,
      NID: '1234',
      nom: 'a',
      prenom: 'Max',
      dateNaissance: new Date(),
      villeNaissance: 'Hasselt',
      civilite: 'M'

    },
    {
      id: 2,
      NID: '5678',
      nom: 'a',
      prenom: 'Lewis',
      dateNaissance: new Date(),
      villeNaissance: 'Stevenage',
      civilite: 'M'
    },
    {
      id: 3,
      NID: '91011',
      nom: 'a',
      prenom: 'Charles',
      dateNaissance: new Date(),
      villeNaissance: 'Monte Carlo',
      civilite: 'M'
    },
    {
      id: 4,
      NID: '121314',
      nom: 'a',
      prenom: 'Lando',
      dateNaissance: new Date(),
      villeNaissance: 'Bristol',
      civilite: 'M'

    }

  ];

  constructor() {

  }

  getAll(): Formateurs[] {
    return this.formateurs;
  }

  getById(id: number): Formateurs | undefined {
    return this.formateurs.find(f => f.id === id);
  }

  save(formateur: Formateurs): void {
    if (!formateur) {
      return;
    }
    if (formateur.id) {
      const index = this.formateurs.findIndex(f => f.id === formateur.id);
      if (index !== -1) {
        this.formateurs[index] = {...formateur};
      }
    } else {
      formateur.id = this.getLastId() + 1;
      this.formateurs.push({...formateur});
    }
  }


  delete(id: number): void {
    this.formateurs = this.formateurs.filter(formateurs => formateurs.id !== id);
  }


  private getLastId() {
    //2eme facon de coder cette methode
    return this.formateurs.length > 0 ? Math.max(...this.formateurs.map(formateurs => formateurs.id ?? 0)) : 0;
  }
}
