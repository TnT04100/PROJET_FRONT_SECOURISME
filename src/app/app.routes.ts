import { Routes } from '@angular/router';
import {FormationListComponent} from './features/formations/formation-list/formation-list.component';
import {FormationFormComponent} from './features/formations/formation-form/formation-form.component';
import {StagiairesFormComponent} from './features/stagiaires/stagiaires-form/stagiaires-form.component';
import {StagiairesListComponent} from './features/stagiaires/stagiaires-list/stagiaires-list.component';
import {FormateurFormComponent} from './features/formateurs/formateur-form/formateur-form.component';
import {FormateurListComponent} from './features/formateurs/formateur-list/formateur-list.component';
import {FormationDetailsComponent} from './features/formations/formation-details/formation-details.component';
import {AccueilComponent} from './features/accueil/accueil.component';
import {AuthentComponent} from './features/authent/authent.component';

export const routes: Routes = [

  {path:'', component: AuthentComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: 'formation', component: FormationListComponent},
  {path: 'formation/form', component: FormationFormComponent},
  {path: 'formation/form/:id', component: FormationFormComponent},
  {path: 'stagiaire', component: StagiairesListComponent},
  {path: 'stagiaire/form', component: StagiairesFormComponent},
  {path: 'stagiaire/form/:id', component: StagiairesFormComponent},
  {path: 'formateur', component: FormateurListComponent},
  {path: 'formateur/form', component: FormateurFormComponent},
  {path: 'formateur/form/:id', component: FormateurFormComponent},
  { path: 'formation', component: FormationListComponent },
  { path: 'formation/details/:id', component: FormationDetailsComponent },


];
