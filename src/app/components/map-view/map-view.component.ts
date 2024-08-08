import { AfterViewInit, Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { HttpClient } from '@angular/common/http';
import mapboxgl, { LngLatBounds, Marker, Popup } from 'mapbox-gl';
import { MapService } from '../../services/map.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  events: Event[] = [];

  constructor(
    private http: HttpClient,
    private placesService: PlacesService,
    private mapService: MapService,
    private eventService: EventService
  ) {}

  ngAfterViewInit(): void {
    if (!this.placesService.useLocation) {
      console.error("No user location available");
      return;
    }

    console.log("User location:", this.placesService.useLocation);

    this.http.get<{ token: string }>('http://localhost:3000/mapbox/token').subscribe({
      next: (response) => {
        mapboxgl.accessToken = response.token;

        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: this.placesService.useLocation as [number, number],
          zoom: 14
        });

        const popup = new Popup()
          .setHTML(`
            <h6>Aquí estoy</h6>
            <span>Estoy en este lugar del mundo</span>
          `);

        new Marker({ color: 'red' })
          .setLngLat(this.placesService.useLocation as [number, number])
          .setPopup(popup)
          .addTo(map);

          this.mapService.setMap(map);
          this.eventService.getListEvents().subscribe(events => {
            this.events = events;
            this.addEventMarkers(map);
          });
      },
      error: (err) => {
        console.error('Error al obtener el token de Mapbox:', err);
      }
    });
  }

  private addEventMarkers(map: mapboxgl.Map) {
    const bounds = new LngLatBounds();
    let pendingRequests = this.events.length;

    this.events.forEach(event => {
      if (event.ubicacion) {
        this.mapService.geocodeLocation(event.ubicacion).subscribe({
          next: ([lng, lat]) => {
            const popup = new Popup()
              .setHTML(`
                <h6>${event.titulo}</h6>
                <span>${event.ubicacion}</span>
              `);

            new Marker({ color: 'blue' })
              .setLngLat([lng, lat])
              .setPopup(popup)
              .addTo(map);

            bounds.extend([lng, lat]);
          },
          error: (err) => {
            console.error(`Invalid coordinates for event ${event.titulo}: ${event.ubicacion}`, err);
          },
          complete: () => {
            pendingRequests--;

            if (pendingRequests === 0) {
              if (bounds.isEmpty()) {
                console.warn("No valid locations found to fit bounds");
              } else {
                map.fitBounds(bounds, { padding: 50 });
              }
            }
          }
        });
      } else {
        pendingRequests--;

        if (pendingRequests === 0) {
          if (bounds.isEmpty()) {
            console.warn("No valid locations found to fit bounds");
          } else {
            map.fitBounds(bounds, { padding: 50 });
          }
        }
      }
    });
  }
}
