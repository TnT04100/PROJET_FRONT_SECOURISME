import {Civilite} from './civilite.type';


export default interface Stagiaire {
  id?: number
  NID: String
  nom: String
  prenom: String
  dateNaissance: Date
  villeNaissance: String
  civilite: Civilite
}
