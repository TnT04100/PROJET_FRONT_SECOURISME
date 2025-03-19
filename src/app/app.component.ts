import {Component, NgModule} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendar

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-project-v2';
}

@NgModule({
  imports: [
    // ...
    FullCalendarModule, // Add FullCalendarModule to your imports
  ],
})
export class AppModule {}
