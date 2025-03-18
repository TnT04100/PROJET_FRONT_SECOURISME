import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  imports: [FullCalendarModule],
  styleUrls: ['./accueil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccueilComponent implements OnInit {

  private getNextMonthDate(): string {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    today.setDate(1);
    return today.toISOString().split('T')[0];
  }

  sharedEvents = [
    { title: 'Réunion', start: '2025-03-10' },
    { title: 'Conférence', start: '2025-03-20' },
    { title: 'Événement spécial', start: '2025-04-05' },
    { title: 'Formation', start: '2025-04-15' },
  ];

  calendarOptions1: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: frLocale,
    events: this.sharedEvents,
    eventClick: (info) => {
      alert(`Événement: ${info.event.title}`);
    }
  };

  calendarOptions2: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialDate: this.getNextMonthDate(),
    locale: frLocale,
    events: this.sharedEvents,
    eventClick: (info) => {
      alert(`Événement: ${info.event.title}`);
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.updateSecondCalendar();
  }

  private updateSecondCalendar(): void {
    this.calendarOptions2.initialDate = this.getNextMonthDate();
  }

  synchronizeCalendars(): void {
    this.updateSecondCalendar();
    // Additional synchronization logic can be added here if needed
  }
}
