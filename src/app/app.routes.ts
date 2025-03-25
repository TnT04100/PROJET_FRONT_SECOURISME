import {Routes} from '@angular/router';
import {FormationListComponent} from './features/formations/formation-list/formation-list.component';
import {FormationFormComponent} from './features/formations/formation-form/formation-form.component';
import {StagiairesFormComponent} from './features/stagiaires/stagiaires-form/stagiaires-form.component';
import {StagiairesListComponent} from './features/stagiaires/stagiaires-list/stagiaires-list.component';
import {FormateurFormComponent} from './features/formateurs/formateur-form/formateur-form.component';
import {FormateurListComponent} from './features/formateurs/formateur-list/formateur-list.component';
import {FormationDetailsComponent} from './features/formations/formation-details/formation-details.component';
import {AccueilComponent} from './features/accueil/accueil.component';
import {AuthentComponent} from './features/authent/authent.component';
import {CookieComponent} from './features/cookie/cookie.component';
import {CoffreFortComponent} from './features/gestion-documents/coffre-fort/coffre-fort.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', component: AuthentComponent},
  {path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard]},
  {path: 'formation', component: FormationListComponent, canActivate: [AuthGuard]},
  {path: 'formation/form', component: FormationFormComponent, canActivate: [AuthGuard]},
  {path: 'formation/form/:id', component: FormationFormComponent, canActivate: [AuthGuard]},
  {path: 'stagiaire', component: StagiairesListComponent, canActivate: [AuthGuard]},
  {path: 'stagiaire/form', component: StagiairesFormComponent, canActivate: [AuthGuard]},
  {path: 'stagiaire/form/:id', component: StagiairesFormComponent, canActivate: [AuthGuard]},
  {path: 'formateur', component: FormateurListComponent, canActivate: [AuthGuard]},
  {path: 'formateur/form', component: FormateurFormComponent, canActivate: [AuthGuard]},
  {path: 'formateur/form/:id', component: FormateurFormComponent, canActivate: [AuthGuard]},
  {path: 'formation/details/:id', component: FormationDetailsComponent, canActivate: [AuthGuard]},
  {path: 'cookie', component: CookieComponent, canActivate: [AuthGuard]},
  {path: 'coffre-fort', component: CoffreFortComponent, canActivate: [AuthGuard]}
];
