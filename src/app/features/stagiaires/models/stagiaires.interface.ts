import {Civilite} from '../../../shared/models/references/civilite.type';
import {Grade} from '../../../shared/models/references/grade.type';


export default interface Stagiaire {
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
