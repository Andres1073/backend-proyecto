import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Peliculas} from '../models';
import {PeliculasRepository} from '../repositories';

export class PeliculasController {
  constructor(
    @repository(PeliculasRepository)
    public peliculasRepository : PeliculasRepository,
  ) {}

  @post('/peliculas')
  @response(200, {
    description: 'Peliculas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Peliculas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peliculas, {
            title: 'NewPeliculas',
            
          }),
        },
      },
    })
    peliculas: Peliculas,
  ): Promise<Peliculas> {
    return this.peliculasRepository.create(peliculas);
  }

  @get('/peliculas/count')
  @response(200, {
    description: 'Peliculas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Peliculas) where?: Where<Peliculas>,
  ): Promise<Count> {
    return this.peliculasRepository.count(where);
  }

  @get('/peliculas')
  @response(200, {
    description: 'Array of Peliculas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Peliculas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Peliculas) filter?: Filter<Peliculas>,
  ): Promise<Peliculas[]> {
    return this.peliculasRepository.find(filter);
  }

  @patch('/peliculas')
  @response(200, {
    description: 'Peliculas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peliculas, {partial: true}),
        },
      },
    })
    peliculas: Peliculas,
    @param.where(Peliculas) where?: Where<Peliculas>,
  ): Promise<Count> {
    return this.peliculasRepository.updateAll(peliculas, where);
  }

  @get('/peliculas/{id}')
  @response(200, {
    description: 'Peliculas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Peliculas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Peliculas, {exclude: 'where'}) filter?: FilterExcludingWhere<Peliculas>
  ): Promise<Peliculas> {
    return this.peliculasRepository.findById(id, filter);
  }

  @patch('/peliculas/{id}')
  @response(204, {
    description: 'Peliculas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peliculas, {partial: true}),
        },
      },
    })
    peliculas: Peliculas,
  ): Promise<void> {
    await this.peliculasRepository.updateById(id, peliculas);
  }

  @put('/peliculas/{id}')
  @response(204, {
    description: 'Peliculas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() peliculas: Peliculas,
  ): Promise<void> {
    await this.peliculasRepository.replaceById(id, peliculas);
  }

  @del('/peliculas/{id}')
  @response(204, {
    description: 'Peliculas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.peliculasRepository.deleteById(id);
  }
}
