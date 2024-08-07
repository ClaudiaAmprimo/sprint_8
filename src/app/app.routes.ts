import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MapaComponent } from './components/mapa-screen/mapa.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { GraficosComponent } from './components/graficos/graficos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'add', component: AddEditEventComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddEditEventComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapaComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: FullCalendarComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: GraficosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];
