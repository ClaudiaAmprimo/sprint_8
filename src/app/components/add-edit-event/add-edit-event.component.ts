import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { format } from 'date-fns';

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
export class AddEditEventComponent {
  eventForm: FormGroup;
  titulo: FormControl;
  ubicacion: FormControl;
  fechaInicio: FormControl;
  fechaFin: FormControl;
  costo: FormControl;
  comentarios: FormControl;

  constructor(){
    this.titulo = new FormControl('', Validators.required);
    this.ubicacion = new FormControl('', Validators.required);
    this.fechaInicio = new FormControl('', Validators.required);
    this.fechaFin = new FormControl('');
    this.costo = new FormControl('', Validators.required);
    this.comentarios = new FormControl('');

    this.eventForm = new FormGroup({
      titulo: this.titulo,
      ubicacion: this.ubicacion,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      costo: this.costo,
      comentarios: this.comentarios
    })
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

      const event = {
        ...formValue,
        fechaInicio: fechaInicioFormatted,
        fechaFin: fechaFinFormatted
      };
      console.log(event);

    }
  }
}
