import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddEditEventComponent },
  { path: 'edit/:id', component: AddEditEventComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];
