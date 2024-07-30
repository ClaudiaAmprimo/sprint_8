export interface Event {
  id?: number,
  id_event?: number,
  viaje_id?: number,
  titulo: string,
  ubicacion: string,
  latitud?: number,
  longitud?: number;
  fecha_inicio: string | Date;
  fecha_fin: string | Date;
  // fecha_inicio: Date;
  // fecha_fin: Date;
  costo: number;
  comentarios?: string;
  user_id_create?: number;
  user_id_paid?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
  // created_at?: Date;
  // updated_at?: Date;
}
