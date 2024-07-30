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
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listEvents: Event[] = [];
  loading: boolean = false
  //   {
  //     id: 1,
  //     titulo: "pasaje a peru",
  //     ubicacion: "barcelona",
  //     fecha_inicio: new Date('2025-01-01'),
  //     fecha_fin: new Date('2025-01-10'),
  //     costo: 850,
  //     comentarios: "vacaciones"
  //   }
  // ]

  constructor(private eventService: EventService){
  }

  ngOnInit(): void {
    this.getListEvents()
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
      }
    });
  }

  deleteEvent(id_event: number){
    this.loading = true;
    this.eventService.deleteEvent(id_event).subscribe(() => {
      console.log(id_event);
      this.getListEvents();
    })
  }
}
