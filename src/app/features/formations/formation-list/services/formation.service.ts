import {Injectable} from '@angular/core';
import Formation from '../models/formation.interface';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formations: Formation[] = [
    {
      id: 1,
      name: 'Formation PSC1 Istres',
      dateDebut: new Date('2023-01-01'),
      dateFin: new Date('2023-01-10'),
      diplome: 'PSC1'
    },
    {
      id: 2,
      name: 'Formation PSC1 Rochefort',
      dateDebut: new Date('2023-02-01'),
      dateFin: new Date('2023-02-10'),
      diplome: 'PSC1'
    },
    {
      id: 3,
      name: 'Formation SC2 ETNC',
      dateDebut: new Date('2023-03-01'),
      dateFin: new Date('2023-03-10'),
      diplome: 'SC2'
    },
    {
      id: 4,
      name: 'Formation SC2 Paris',
      dateDebut: new Date('2023-04-01'),
      dateFin: new Date('2023-04-10'),
      diplome: 'SC2'
    }

  ];

  constructor() {

  }

  getAll(): Formation[] {
    return this.formations;
  }

  getById(id: number): Formation | undefined {
    return this.formations.find(formation => formation.id === id);
  }

  save(formation: Formation): void {
    if (!formation) {
      return;
    }
    if (formation.id) {
      const index = this.formations.findIndex(formation => formation.id === formation.id);
      if (index !== -1) {
        this.formations[index] = {...formation};
      }
    } else {
      formation.id = this.getLastId() + 1;
      this.formations.push({...formation});
    }
  }


  delete(id: number): void {
    this.formations = this.formations.filter(formation => formation.id !== id);
  }


  private getLastId() {
    //2eme facon de coder cette methode
    return this.formations.length > 0 ? Math.max(...this.formations.map(formation => formation.id ?? 0)) : 0;
  }
}
