import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listEvents: Event[] = [];
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | 'warning' = 'success';

  constructor(private eventService: EventService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getListEvents();
    this.alertService.alertMessage$.subscribe(alert => {
      if (alert) {
        this.alertMessage = alert.message;
        this.alertType = alert.type;
        setTimeout(() => {
          this.alertService.clearAlert();
        }, 5000);
      } else {
        this.alertMessage = null;
      }
    });
  }

  getListEvents() {
    this.eventService.getListEvents().subscribe({
      next: data => {
        this.listEvents = data;
        console.log(data);
      },
      error: error => {
        console.error('Error al obtener los eventos:', error);
      }
    });
  }

  deleteEvent(id_event: number) {
    this.eventService.deleteEvent(id_event).subscribe({
      next: () => {
        console.log(id_event);
        this.alertService.showAlert('El evento ha sido eliminado con éxito', 'danger');
        this.getListEvents();
      },
      error: error => {
        console.error('Error al eliminar el evento:', error);
      }
    });
  }
}
