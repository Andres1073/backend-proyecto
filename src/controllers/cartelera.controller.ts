import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Cartelera} from '../models';
import {CarteleraRepository} from '../repositories';

export class CarteleraController {
  constructor(
    @repository(CarteleraRepository)
    public carteleraRepository: CarteleraRepository,
  ) { }

  @post('/carteleras')
  @response(200, {
    description: 'Cartelera model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cartelera)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartelera, {
            title: 'NewCartelera',
            exclude: ['usuarioId']

          }),
        },
      },
    })
    cartelera: Cartelera,
  ): Promise<Cartelera> {
    return this.carteleraRepository.create(cartelera);
  }

  @get('/carteleras/count')
  @response(200, {
    description: 'Cartelera model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cartelera) where?: Where<Cartelera>,
  ): Promise<Count> {
    return this.carteleraRepository.count(where);
  }

  @get('/carteleras')
  @response(200, {
    description: 'Array of Cartelera model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cartelera, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cartelera) filter?: Filter<Cartelera>,
  ): Promise<Cartelera[]> {
    return this.carteleraRepository.find(filter);
  }

  @patch('/carteleras')
  @response(200, {
    description: 'Cartelera PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartelera, {partial: true}),
        },
      },
    })
    cartelera: Cartelera,
    @param.where(Cartelera) where?: Where<Cartelera>,
  ): Promise<Count> {
    return this.carteleraRepository.updateAll(cartelera, where);
  }

  @get('/carteleras/{id}')
  @response(200, {
    description: 'Cartelera model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cartelera, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cartelera, {exclude: 'where'}) filter?: FilterExcludingWhere<Cartelera>
  ): Promise<Cartelera> {
    return this.carteleraRepository.findById(id, filter);
  }

  @patch('/carteleras/{id}')
  @response(204, {
    description: 'Cartelera PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cartelera, {partial: true}),
        },
      },
    })
    cartelera: Cartelera,
  ): Promise<void> {
    await this.carteleraRepository.updateById(id, cartelera);
  }

  @put('/carteleras/{id}')
  @response(204, {
    description: 'Cartelera PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cartelera: Cartelera,
  ): Promise<void> {
    await this.carteleraRepository.replaceById(id, cartelera);
  }

  @del('/carteleras/{id}')
  @response(204, {
    description: 'Cartelera DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carteleraRepository.deleteById(id);
  }
}
