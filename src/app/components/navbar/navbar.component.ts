import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
