import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cartelera, CarteleraRelations, Usuario, Horario, Peliculas} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {HorarioRepository} from './horario.repository';
import {PeliculasRepository} from './peliculas.repository';

export class CarteleraRepository extends DefaultCrudRepository<
  Cartelera,
  typeof Cartelera.prototype.correo_usuario,
  CarteleraRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Cartelera.prototype.correo_usuario>;

  public readonly horarios: HasManyRepositoryFactory<Horario, typeof Cartelera.prototype.correo_usuario>;

  public readonly peliculas: HasManyRepositoryFactory<Peliculas, typeof Cartelera.prototype.correo_usuario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('HorarioRepository') protected horarioRepositoryGetter: Getter<HorarioRepository>, @repository.getter('PeliculasRepository') protected peliculasRepositoryGetter: Getter<PeliculasRepository>,
  ) {
    super(Cartelera, dataSource);
    this.peliculas = this.createHasManyRepositoryFactoryFor('peliculas', peliculasRepositoryGetter,);
    this.registerInclusionResolver('peliculas', this.peliculas.inclusionResolver);
    this.horarios = this.createHasManyRepositoryFactoryFor('horarios', horarioRepositoryGetter,);
    this.registerInclusionResolver('horarios', this.horarios.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
