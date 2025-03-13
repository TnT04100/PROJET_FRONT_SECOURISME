import { Routes } from '@angular/router';
import {FormationListComponent} from './features/formations/formation-list/formation-list.component';
import {FormationFormComponent} from './features/formations/formation-form/formation-form.component';
import {StagiairesFormComponent} from './features/stagiaires/stagiaires-form/stagiaires-form.component';
import {StagiairesListComponent} from './features/stagiaires/stagiaires-list/stagiaires-list.component';
import {FormateurFormComponent} from './features/formateurs/formateur-form/formateur-form.component';

export const routes: Routes = [

  {path: 'formation', component: FormationListComponent},
  {path: 'formation/form', component: FormationFormComponent},
  {path: 'formation/form/:id', component: FormationFormComponent},
  {path: 'stagiaire', component: StagiairesListComponent},
  {path: 'stagiaire/form', component: StagiairesFormComponent},
  {path: 'stagiaire/form/:id', component: StagiairesFormComponent},
  {path: 'formateur', component: FormationListComponent},
  {path: 'formateur/form', component: FormateurFormComponent},
  {path: 'formateur/form/:id', component: FormateurFormComponent},


];
