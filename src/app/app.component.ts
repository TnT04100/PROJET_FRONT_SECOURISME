import {Component, NgModule} from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import {AuthentComponent} from './features/authent/authent.component';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app.routes'; // Import FullCalendar

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

  declarations: [],
  imports: [FullCalendarModule, BrowserModule, RouterModule.forRoot(routes), AppComponent, AuthentComponent],
  providers: []
})
export class AppModule {}
