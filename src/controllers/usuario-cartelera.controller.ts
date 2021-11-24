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
  Usuario,
  Cartelera,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioCarteleraController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/carteleras', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Cartelera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cartelera)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cartelera>,
  ): Promise<Cartelera[]> {
    return this.usuarioRepository.carteleras(id).find(filter);
  }

  @post('/usuarios/{id}/carteleras', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cartelera)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.correo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartelera, {
            title: 'NewCarteleraInUsuario',
            exclude: ['correo_usuario'],
            optional: ['usuarioId']
          }),
        },
      },
    }) cartelera: Omit<Cartelera, 'correo_usuario'>,
  ): Promise<Cartelera> {
    return this.usuarioRepository.carteleras(id).create(cartelera);
  }

  @patch('/usuarios/{id}/carteleras', {
    responses: {
      '200': {
        description: 'Usuario.Cartelera PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartelera, {partial: true}),
        },
      },
    })
    cartelera: Partial<Cartelera>,
    @param.query.object('where', getWhereSchemaFor(Cartelera)) where?: Where<Cartelera>,
  ): Promise<Count> {
    return this.usuarioRepository.carteleras(id).patch(cartelera, where);
  }

  @del('/usuarios/{id}/carteleras', {
    responses: {
      '200': {
        description: 'Usuario.Cartelera DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cartelera)) where?: Where<Cartelera>,
  ): Promise<Count> {
    return this.usuarioRepository.carteleras(id).delete(where);
  }
}
