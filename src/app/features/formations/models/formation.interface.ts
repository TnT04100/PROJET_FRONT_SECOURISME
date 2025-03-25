import {Diplome} from './diplome.type';
import Formateurs from '../../formateurs/models/formateurs.interface';
import Stagiaire from '../../stagiaires/models/stagiaires.interface';
import {UniteEnseignement} from '../../unite-enseignement/models/unite-enseignement.interface';
import {Localisation} from '../../localisation/models/localisation.interface';

export default interface Formation {
  id?: number
  libelleFormation: String
  dateDebut: Date
  dateFin: Date
  uniteEnseignementId: number
  localisationId: number
  salleFormation: String
  codeCours: String
  formateursIds: number[]
  stagiairesIds: number[]
  selected?: boolean;
}
