import {Diplome} from './diplome.type';
import Formateurs from '../../../formateurs/models/formateurs.interface';
import Stagiaire from '../../../stagiaires/models/stagiaires.interface';

export default interface Formation {
  id?: number
  libelle: String
  dateDebut: Date
  dateFin: Date
  diplome: Diplome
  salleFormation: String
  codeCours: String
  formateur: Formateurs[]
  stagiaires: Stagiaire[]
  selected?: boolean;
}
