import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listEvents: Event[] = [];
  loading: boolean = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getListEvents();
  }

  getListEvents() {
    this.loading = true;
    this.eventService.getListEvents().subscribe({
      next: data => {
        this.listEvents = data;
        console.log(data);
        this.loading = false;
      },
      error: error => {
        console.error('Error al obtener los eventos:', error);
        this.loading = false;
      }
    });
  }

  deleteEvent(id_event: number) {
    this.loading = true;
    this.eventService.deleteEvent(id_event).subscribe({
      next: () => {
        console.log(id_event);
        this.getListEvents();
      },
      error: error => {
        console.error('Error al eliminar el evento:', error);
        this.loading = false;
      }
    });
  }
}
