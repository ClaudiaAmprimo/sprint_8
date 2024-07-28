import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
  horaInicio: FormControl;
  fechaFin: FormControl;
  horaFin: FormControl;
  costo: FormControl;
  comentarios: FormControl;

  constructor(){
    this.titulo = new FormControl('', Validators.required);
    this.ubicacion = new FormControl('', Validators.required);
    this.fechaInicio = new FormControl('', Validators.required);
    this.horaInicio = new FormControl('', Validators.required);
    this.fechaFin = new FormControl('');
    this.horaFin = new FormControl('');
    this.costo = new FormControl('', Validators.required);
    this.comentarios = new FormControl('');

    this.eventForm = new FormGroup({
      titulo: this.titulo,
      ubicacion: this.ubicacion,
      fechaInicio: this.fechaInicio,
      horaInicio: this.horaInicio,
      fechaFin: this.fechaFin,
      horaFin: this.horaFin,
      costo: this.costo,
      comentarios: this.comentarios
    })
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      console.log('Form Value:', formValue);

    }
  }
}
