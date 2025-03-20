import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';
import { AuthentComponent } from './features/authent/authent.component';
import { FormationListComponent } from './features/formations/formation-list/formation-list.component';
import { FormationFormComponent } from './features/formations/formation-form/formation-form.component';
import { StagiairesFormComponent } from './features/stagiaires/stagiaires-form/stagiaires-form.component';
import { StagiairesListComponent } from './features/stagiaires/stagiaires-list/stagiaires-list.component';
import { FormateurFormComponent } from './features/formateurs/formateur-form/formateur-form.component';
import { FormateurListComponent } from './features/formateurs/formateur-list/formateur-list.component';
import { FormationDetailsComponent } from './features/formations/formation-details/formation-details.component';
import { AccueilComponent } from './features/accueil/accueil.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FullCalendarModule,
    AppComponent,
    AuthentComponent,
    FormationListComponent,
    FormationFormComponent,
    StagiairesFormComponent,
    StagiairesListComponent,
    FormateurFormComponent,
    FormateurListComponent,
    FormationDetailsComponent,
    AccueilComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
