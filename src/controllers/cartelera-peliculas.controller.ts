import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cartelera,
  Peliculas,
} from '../models';
import {CarteleraRepository} from '../repositories';

export class CarteleraPeliculasController {
  constructor(
    @repository(CarteleraRepository) protected carteleraRepository: CarteleraRepository,
  ) { }

  @get('/carteleras/{id}/peliculas', {
    responses: {
      '200': {
        description: 'Array of Cartelera has many Peliculas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Peliculas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Peliculas>,
  ): Promise<Peliculas[]> {
    return this.carteleraRepository.peliculas(id).find(filter);
  }

  @post('/carteleras/{id}/peliculas', {
    responses: {
      '200': {
        description: 'Cartelera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Peliculas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cartelera.prototype.correo_usuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peliculas, {
            title: 'NewPeliculasInCartelera',
            exclude: ['ubicacion'],
            optional: ['nombre_pelicula']
          }),
        },
      },
    }) peliculas: Omit<Peliculas, 'ubicacion'>,
  ): Promise<Peliculas> {
    return this.carteleraRepository.peliculas(id).create(peliculas);
  }

  @patch('/carteleras/{id}/peliculas', {
    responses: {
      '200': {
        description: 'Cartelera.Peliculas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peliculas, {partial: true}),
        },
      },
    })
    peliculas: Partial<Peliculas>,
    @param.query.object('where', getWhereSchemaFor(Peliculas)) where?: Where<Peliculas>,
  ): Promise<Count> {
    return this.carteleraRepository.peliculas(id).patch(peliculas, where);
  }

  @del('/carteleras/{id}/peliculas', {
    responses: {
      '200': {
        description: 'Cartelera.Peliculas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Peliculas)) where?: Where<Peliculas>,
  ): Promise<Count> {
    return this.carteleraRepository.peliculas(id).delete(where);
  }
}
