import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Peliculas, PeliculasRelations, Cartelera} from '../models';
import {CarteleraRepository} from './cartelera.repository';

export class PeliculasRepository extends DefaultCrudRepository<
  Peliculas,
  typeof Peliculas.prototype.ubicacion,
  PeliculasRelations
> {

  public readonly nom_pel: BelongsToAccessor<Cartelera, typeof Peliculas.prototype.ubicacion>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CarteleraRepository') protected carteleraRepositoryGetter: Getter<CarteleraRepository>,
  ) {
    super(Peliculas, dataSource);
    this.nom_pel = this.createBelongsToAccessorFor('nom_pel', carteleraRepositoryGetter,);
    this.registerInclusionResolver('nom_pel', this.nom_pel.inclusionResolver);
  }
}
