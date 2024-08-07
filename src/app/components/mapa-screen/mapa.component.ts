import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { LoadingComponent } from "../loading/loading.component";
import { MapViewComponent } from "../map-view/map-view.component";
import { BtnMapLocationComponent } from "../btn-map-location/btn-map-location.component";

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LoadingComponent, MapViewComponent, BtnMapLocationComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent {
  constructor(private placesService: PlacesService) {}

  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }

}
