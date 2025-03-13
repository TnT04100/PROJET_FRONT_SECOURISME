import {Diplome} from './diplome.type';

export default interface Formation {
  id?: number
  name: String
  dateDebut: Date
  dateFin: Date
  diplome: Diplome
}
