import { Component, OnInit } from '@angular/core';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listEvents: Event[] = [
    {
      id: 1,
      titulo: "pasaje a peru",
      ubicacion: "barcelona",
      fecha_inicio: new Date('2025-01-01'),
      fecha_fin: new Date('2025-01-10'),
      costo: 850,
      comentarios: "vacaciones"
    }
  ]

  constructor(private eventService: EventService){
  }

  ngOnInit(): void {
    this.getListEvents()
  }

  getListEvents(){
    this.eventService.getListEvents().subscribe((data) => {
      console.log(data)

    })
  }
}
