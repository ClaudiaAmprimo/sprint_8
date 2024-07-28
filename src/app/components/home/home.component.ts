import { Component } from '@angular/core';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listEvents: Event[] = [
    {
      id: 1,
      titulo: "pasaje a peru",
      ubicacion: "barcelona",
      fecha_inicio: new Date('2025-01-01'),
      hora_inicio: "8:30",
      fecha_fin: new Date('2025-01-10'),
      hora_fin: "22:00",
      costo: 850,
      comentarios: "vacaciones"
    }
  ]
}
