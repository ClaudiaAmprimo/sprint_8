import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

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

  getListEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.baseUrl}${this.eventUrl}`)
  }
}
