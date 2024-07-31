import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { format } from 'date-fns';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event';
import { ViajeService } from '../../services/viaje.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-edit-event',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './add-edit-event.component.html',
  styleUrl: './add-edit-event.component.scss'
})
export class AddEditEventComponent implements OnInit {
  eventForm: FormGroup;
  titulo: FormControl;
  ubicacion: FormControl;
  fechaInicio: FormControl;
  fechaFin: FormControl;
  costo: FormControl;
  comentarios: FormControl;
  viaje: FormControl;
  viajes: any[] = [];
  eventAddedSuccess: boolean = false;

  constructor(private eventService: EventService, private viajeService: ViajeService, private authService: AuthService){
    this.titulo = new FormControl('', Validators.required);
    this.ubicacion = new FormControl('', Validators.required);
    this.fechaInicio = new FormControl('', Validators.required);
    this.fechaFin = new FormControl('');
    this.costo = new FormControl('', Validators.required);
    this.comentarios = new FormControl('');
    this.viaje = new FormControl('', Validators.required);

    this.eventForm = new FormGroup({
      titulo: this.titulo,
      ubicacion: this.ubicacion,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      costo: this.costo,
      comentarios: this.comentarios,
      viajeId: this.viaje
    })
  }

  ngOnInit() {
    this.loadViajes();
  }

  loadViajes() {
    this.viajeService.getUserViajes().subscribe({
      next: (response) => {
        this.viajes = response.data;
      },
      error: (error) => {
        console.error('Error al obtener los viajes:', error);
      }
    });
  }

  formatDateTime(dateTime: string): string {
    if (!dateTime) return '';

    const formattedDateTime = format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');
    return formattedDateTime;
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      console.log('Form Value:', formValue);

      const fechaInicioFormatted = this.formatDateTime(formValue.fechaInicio);
      const fechaFinFormatted = this.formatDateTime(formValue.fechaFin);

      const userIdCreate = this.authService.getUserId();
      console.log('User ID:', userIdCreate);
      if (userIdCreate === null) {
        console.error('Error: No se pudo obtener el ID del usuario.');
        return;
      }

      const event: Event = {
        titulo: formValue.titulo,
        ubicacion: formValue.ubicacion,
        fecha_inicio: fechaInicioFormatted,
        fecha_fin: fechaFinFormatted,
        costo: formValue.costo,
        comentarios: formValue.comentarios,
        viaje_id: parseInt(formValue.viajeId, 10),
        user_id_create: userIdCreate
      };

      console.log('Event:', event);
      this.addEvent(event);
    }
  }


  addEvent(event: Event) {
    this.eventService.saveEvent(event).subscribe({
      next: () => {
        console.log("evento agregado");
        this.eventForm.reset();
        this.eventAddedSuccess = true;
        setTimeout(() => {
          this.eventAddedSuccess = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Error al agregar evento:', error);
      }
    });
  }
}
