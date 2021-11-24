import {Entity, hasMany, model, property} from '@loopback/repository';
import {Cartelera} from './cartelera.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @hasMany(() => Cartelera)
  carteleras: Cartelera[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
