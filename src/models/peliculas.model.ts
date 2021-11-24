import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cartelera} from './cartelera.model';

@model()
export class Peliculas extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  ubicacion: string;

  @belongsTo(() => Cartelera, {name: 'nom_pel'})
  nombre_pelicula: string;

  constructor(data?: Partial<Peliculas>) {
    super(data);
  }
}

export interface PeliculasRelations {
  // describe navigational properties here
}

export type PeliculasWithRelations = Peliculas & PeliculasRelations;
