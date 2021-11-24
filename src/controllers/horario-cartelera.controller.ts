import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Horario,
  Cartelera,
} from '../models';
import {HorarioRepository} from '../repositories';

export class HorarioCarteleraController {
  constructor(
    @repository(HorarioRepository)
    public horarioRepository: HorarioRepository,
  ) { }

  @get('/horarios/{id}/cartelera', {
    responses: {
      '200': {
        description: 'Cartelera belonging to Horario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cartelera)},
          },
        },
      },
    },
  })
  async getCartelera(
    @param.path.string('id') id: typeof Horario.prototype.horario,
  ): Promise<Cartelera> {
    return this.horarioRepository.hor_pel(id);
  }
}
