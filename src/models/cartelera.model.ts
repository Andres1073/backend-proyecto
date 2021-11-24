import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Horario} from './horario.model';
import {Peliculas} from './peliculas.model';
import {Usuario} from './usuario.model';

@model()
export class Cartelera extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre_pelicula: string;

  @property({
    type: 'string',
    required: true,
  })
  horario_pelicula: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  correo_usuario: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Horario, {keyTo: 'horario_pelicula'})
  horarios: Horario[];

  @hasMany(() => Peliculas, {keyTo: 'nombre_pelicula'})
  peliculas: Peliculas[];

  constructor(data?: Partial<Cartelera>) {
    super(data);
  }
}

export interface CarteleraRelations {
  // describe navigational properties here
}

export type CarteleraWithRelations = Cartelera & CarteleraRelations;
