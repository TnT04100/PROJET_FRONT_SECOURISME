import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import {PopUpComponent} from '../pop-up/pop-up.component';
import {EventApi} from 'fullcalendar';
import {MenuComponent} from '../../shared/menu/menu.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  imports: [FullCalendarModule, PopUpComponent, PopUpComponent, MenuComponent],
  styleUrls: ['./accueil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccueilComponent implements OnInit {
  isPopUpVisible = false;
  popUpTitle = '';
  popUpContent = '';

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
    }
  };

  calendarOptions2: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    initialDate: this.getNextMonthDate(new Date()),
    locale: frLocale,
    events: this.sharedEvents,
    eventClick: (info) => {
      this.showPopup(info.event);
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.updateSecondCalendar();
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

  private showPopup(event: EventApi): void {
    this.popUpTitle = event.title;
    this.popUpContent = `Date: ${event.start?.toISOString().split('T')[0]}`;
    this.isPopUpVisible = true;
  }

  hidePopUp() {
    this.isPopUpVisible = false;
  }
}
