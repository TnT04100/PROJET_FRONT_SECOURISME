import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EventApi } from 'fullcalendar';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  imports: [FullCalendarModule, PopUpComponent, MenuComponent],
  styleUrls: ['./accueil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccueilComponent implements OnInit {

  @ViewChild('calendar1') calendar1?: FullCalendarComponent;
  @ViewChild('calendar2') calendar2?: FullCalendarComponent;

  isPopUpVisible = false;
  popUpTitle = '';
  popUpContent = '';

  currentMonthYear1 = '';
  currentMonthYear2 = '';

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
      this.showPopup(info.event);
    },
    headerToolbar: false // Hide default header to use our custom buttons
  };

  calendarOptions2: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialDate: this.getNextMonthDate(new Date()),
    locale: frLocale,
    events: this.sharedEvents,
    eventClick: (info) => {
      this.showPopup(info.event);
    },
    headerToolbar: false // Hide default header to use our custom buttons
  };

  constructor() { }

  ngOnInit(): void {
    this.updateSecondCalendar();
    setTimeout(() => this.updateMonthYear(), 0); // Ensure the view is initialized
  }

  navigatePrevious(): void {
    if (this.calendar1 && this.calendar2) {
      const calendarApi1 = this.calendar1.getApi();
      calendarApi1.prev();

      const calendarApi2 = this.calendar2.getApi();
      calendarApi2.prev();

      this.updateMonthYear();
    }
  }

  navigateNext(): void {
    if (this.calendar1 && this.calendar2) {
      const calendarApi1 = this.calendar1.getApi();
      calendarApi1.next();

      const calendarApi2 = this.calendar2.getApi();
      calendarApi2.next();

      this.updateMonthYear();
    }
  }

  navigateToday(): void {
    if (this.calendar1 && this.calendar2) {
      const calendarApi1 = this.calendar1.getApi();
      calendarApi1.today();

      const calendarApi2 = this.calendar2.getApi();
      calendarApi2.gotoDate(this.getNextMonthDate(new Date()));

      this.updateMonthYear();
    }
  }

  private getNextMonthDate(date: Date): string {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(1);
    return nextMonth.toISOString().split('T')[0];
  }

  private updateSecondCalendar(): void {
    this.calendarOptions2.initialDate = this.getNextMonthDate(new Date());
  }

  private updateMonthYear(): void {
    if (this.calendar1 && this.calendar2) {
      const calendarApi1 = this.calendar1.getApi();
      const calendarApi2 = this.calendar2.getApi();

      const date1 = calendarApi1.getDate();
      const date2 = calendarApi2.getDate();

      this.currentMonthYear1 = date1.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
      this.currentMonthYear2 = date2.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
    }
  }

  private showPopup(event: EventApi): void {
    this.popUpTitle = event.title;
    this.popUpContent = `Date: ${event.start?.toISOString().split('T')[0]}`;
    this.isPopUpVisible = true;
  }

  hidePopUp() {
    this.isPopUpVisible = false;
  }
}
