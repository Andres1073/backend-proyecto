import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cartelera} from './cartelera.model';

@model()
export class Horario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  horario: string;

  @belongsTo(() => Cartelera, {name: 'hor_pel'})
  horario_pelicula: string;

  constructor(data?: Partial<Horario>) {
    super(data);
  }
}

export interface HorarioRelations {
  // describe navigational properties here
}

export type HorarioWithRelations = Horario & HorarioRelations;
