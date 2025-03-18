import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr'; // Importer la langue française

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  imports: [FullCalendarModule],
  styleUrls: ['./accueil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccueilComponent implements OnInit {

  // Calculer le premier jour du mois suivant
  private getNextMonthDate(): string {
    const today = new Date();
    // On prend le mois suivant
    today.setMonth(today.getMonth() + 1);
    // On réinitialise le jour au premier jour du mois suivant
    today.setDate(1);
    // Retourner la date au format YYYY-MM-DD
    return today.toISOString().split('T')[0];
  }

  // Gestion des événements partagés
  sharedEvents = [
    { title: 'Réunion', start: '2025-03-10' },
    { title: 'Conférence', start: '2025-03-20' },
    { title: 'Événement spécial', start: '2025-04-05' },
    { title: 'Formation', start: '2025-04-15' },
  ];

  // Option pour le premier calendrier (mois actuel)
  calendarOptions1: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: frLocale,
    events: this.sharedEvents,
    eventClick: (info) => {
      alert(`Événement: ${info.event.title}`);
    }
  };

  // Option pour le deuxième calendrier (mois suivant)
  calendarOptions2: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialDate: this.getNextMonthDate(), // Mois suivant
    locale: frLocale,
    events: this.sharedEvents,
    eventClick: (info) => {
      alert(`Événement: ${info.event.title}`);
    }
  };

  constructor() { }

  ngOnInit(): void {
    // Après le chargement du composant, on met à jour la date du mois suivant pour le deuxième calendrier
    this.updateSecondCalendar();
  }

  private updateSecondCalendar(): void {
    // Recalculer la date du mois suivant et mettre à jour l'option pour le calendrier 2
    this.calendarOptions2.initialDate = this.getNextMonthDate();
  }

}
