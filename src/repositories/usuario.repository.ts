import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Cartelera} from '../models';
import {CarteleraRepository} from './cartelera.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.correo,
  UsuarioRelations
> {

  public readonly carteleras: HasManyRepositoryFactory<Cartelera, typeof Usuario.prototype.correo>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CarteleraRepository') protected carteleraRepositoryGetter: Getter<CarteleraRepository>,
  ) {
    super(Usuario, dataSource);
    this.carteleras = this.createHasManyRepositoryFactoryFor('carteleras', carteleraRepositoryGetter,);
    this.registerInclusionResolver('carteleras', this.carteleras.inclusionResolver);
  }
}
