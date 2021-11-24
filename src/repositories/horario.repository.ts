import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Horario, HorarioRelations, Cartelera} from '../models';
import {CarteleraRepository} from './cartelera.repository';

export class HorarioRepository extends DefaultCrudRepository<
  Horario,
  typeof Horario.prototype.horario,
  HorarioRelations
> {

  public readonly hor_pel: BelongsToAccessor<Cartelera, typeof Horario.prototype.horario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CarteleraRepository') protected carteleraRepositoryGetter: Getter<CarteleraRepository>,
  ) {
    super(Horario, dataSource);
    this.hor_pel = this.createBelongsToAccessorFor('hor_pel', carteleraRepositoryGetter,);
    this.registerInclusionResolver('hor_pel', this.hor_pel.inclusionResolver);
  }
}
