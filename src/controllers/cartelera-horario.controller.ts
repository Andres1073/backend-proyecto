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
  Horario,
} from '../models';
import {CarteleraRepository} from '../repositories';

export class CarteleraHorarioController {
  constructor(
    @repository(CarteleraRepository) protected carteleraRepository: CarteleraRepository,
  ) { }

  @get('/carteleras/{id}/horarios', {
    responses: {
      '200': {
        description: 'Array of Cartelera has many Horario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Horario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Horario>,
  ): Promise<Horario[]> {
    return this.carteleraRepository.horarios(id).find(filter);
  }

  @post('/carteleras/{id}/horarios', {
    responses: {
      '200': {
        description: 'Cartelera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Horario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cartelera.prototype.correo_usuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {
            title: 'NewHorarioInCartelera',
            exclude: ['horario'],
            optional: ['horario_pelicula']
          }),
        },
      },
    }) horario: Omit<Horario, 'horario'>,
  ): Promise<Horario> {
    return this.carteleraRepository.horarios(id).create(horario);
  }

  @patch('/carteleras/{id}/horarios', {
    responses: {
      '200': {
        description: 'Cartelera.Horario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {partial: true}),
        },
      },
    })
    horario: Partial<Horario>,
    @param.query.object('where', getWhereSchemaFor(Horario)) where?: Where<Horario>,
  ): Promise<Count> {
    return this.carteleraRepository.horarios(id).patch(horario, where);
  }

  @del('/carteleras/{id}/horarios', {
    responses: {
      '200': {
        description: 'Cartelera.Horario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Horario)) where?: Where<Horario>,
  ): Promise<Count> {
    return this.carteleraRepository.horarios(id).delete(where);
  }
}
