export interface Event {
  id?: number,
  id_event?: number,
  viaje_id?: number,
  titulo: string,
  ubicacion: string,
  latitud?: number,
  longitud?: number;
  fecha_inicio: Date;
  hora_inicio: string;
  fecha_fin: Date;
  hora_fin: string;
  costo: number;
  comentarios?: string;
  user_id_create?: number;
  user_id_paid?: number;
  created_at?: Date;
  updated_at?: Date;
}
