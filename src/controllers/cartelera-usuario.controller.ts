import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Cartelera,
  Usuario
} from '../models';
import {CarteleraRepository} from '../repositories';

export class CarteleraUsuarioController {
  constructor(
    @repository(CarteleraRepository)
    public carteleraRepository: CarteleraRepository,
  ) { }

  @get('/carteleras/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Cartelera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Cartelera.prototype.correo_usuario,
  ): Promise<Usuario> {
    return this.carteleraRepository.usuario(id);
  }
}
