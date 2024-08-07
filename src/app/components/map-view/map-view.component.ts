// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { PlacesService } from '../../services/places.service';
// import { HttpClient } from '@angular/common/http';
// import mapboxgl, { Marker, Popup } from 'mapbox-gl';

// @Component({
//   selector: 'app-map-view',
//   standalone: true,
//   imports: [],
//   templateUrl: './map-view.component.html',
//   styleUrl: './map-view.component.scss'
// })
// export class MapViewComponent implements AfterViewInit {

//   constructor(private http: HttpClient, private placesService: PlacesService) {}

//   ngAfterViewInit(): void {
//     if (!this.placesService.useLocation) {
//       console.error("No user location available");
//       return;
//     }

//     console.log(this.placesService.useLocation)
//     this.http.get<{ token: string }>('http://localhost:3000/mapbox/token').subscribe(response => {
//       mapboxgl.accessToken = response.token;

//       const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: this.placesService.useLocation as [number, number],
//         zoom: 14
//       });

//       const popup = new Popup()
//       .setHTML(`
//         <h6>Aquí estoy</h6>
//         <span>Estoy en este lugar del mundo</span>
//         `);

//         new Marker({color: 'red'})
//         .setLngLat(this.placesService.useLocation as [number, number])
//         .setPopup(popup)
//         .addTo(map)
//     });
//   }
// }
import { AfterViewInit, Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { HttpClient } from '@angular/common/http';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {

  constructor(private http: HttpClient, private placesService: PlacesService, private mapService: MapService) {}

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
      },
      error: (err) => {
        console.error('Error al obtener el token de Mapbox:', err);
      }
    });
  }
}
