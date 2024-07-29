import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'add', component: AddEditEventComponent },
  { path: 'edit/:id', component: AddEditEventComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];
