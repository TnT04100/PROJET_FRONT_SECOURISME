import {Civilite} from './civilite.type';
import {Grade} from './grade.type';


export default interface Formateurs {
  id?: number
  numeroIdentifiantDefense: String
  nom: String
  prenom: String
  dateDeNaissance: Date
  villeDeNaissance: String
  civilite: Civilite
  grade: Grade
  uniteId: number
}
