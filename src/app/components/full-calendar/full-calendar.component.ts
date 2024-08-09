import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-full-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './full-calendar.component.html',
  styleUrl: './full-calendar.component.scss'
})
export class FullCalendarComponent implements OnInit{
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: [],
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    slotMinTime: '00:00:00',
    slotMaxTime: '24:00:00',
    timeZone: 'local'
  };

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getListEvents().subscribe(events => {
      const calendarEvents = events.map(event => ({
        title: event.titulo,
        start: event.fecha_inicio,
        end: event.fecha_fin,
        backgroundColor: '#b0c4b1',
        borderColor: '#b0c4b1',
        textColor: 'black'
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: calendarEvents
      };
    });
  }
}
