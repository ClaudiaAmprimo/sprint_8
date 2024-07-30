import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl: string;
  private eventUrl: string;

  constructor(private http: HttpClient){
    this.baseUrl = environment.endpoint;
    this.eventUrl = 'event/'
  }

  getListEvents(): Observable<Event[]> {
    return this.http.get<{ data: Event[] }>(`${this.baseUrl}${this.eventUrl}`, { withCredentials: true }).pipe(
      map(response => response.data.map(event => ({
        ...event,
        fecha_inicio: new Date(event.fecha_inicio ?? ''),
        fecha_fin: new Date(event.fecha_fin ?? ''),
        created_at: new Date(event.created_at ?? ''),
        updated_at: new Date(event.updated_at ?? '')
      })))
    );
  }

  deleteEvent(id_event: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}${this.eventUrl}${id_event}`)
  }
}
