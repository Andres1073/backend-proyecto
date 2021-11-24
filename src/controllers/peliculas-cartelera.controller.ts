import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Peliculas,
  Cartelera,
} from '../models';
import {PeliculasRepository} from '../repositories';

export class PeliculasCarteleraController {
  constructor(
    @repository(PeliculasRepository)
    public peliculasRepository: PeliculasRepository,
  ) { }

  @get('/peliculas/{id}/cartelera', {
    responses: {
      '200': {
        description: 'Cartelera belonging to Peliculas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cartelera)},
          },
        },
      },
    },
  })
  async getCartelera(
    @param.path.string('id') id: typeof Peliculas.prototype.ubicacion,
  ): Promise<Cartelera> {
    return this.peliculasRepository.nom_pel(id);
  }
}
