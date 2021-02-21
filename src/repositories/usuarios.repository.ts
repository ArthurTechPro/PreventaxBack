import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Nits, Usuarios, UsuariosRelations, Inspecciones} from '../models';
import {NitsRepository} from './nits.repository';
import {InspeccionesRepository} from './inspecciones.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.IdUsuario,
  UsuariosRelations
  > {

  public readonly btUsuNit: BelongsToAccessor<Nits, typeof Usuarios.prototype.IdUsuario>;

  public readonly FKUsuInspec: HasManyRepositoryFactory<Inspecciones, typeof Usuarios.prototype.IdUsuario>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.FKUsuInspec = this.createHasManyRepositoryFactoryFor('FKUsuInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('FKUsuInspec', this.FKUsuInspec.inclusionResolver);
    this.btUsuNit = this.createBelongsToAccessorFor('btUsuNit', nitsRepositoryGetter,);
    this.registerInclusionResolver('btUsuNit', this.btUsuNit.inclusionResolver);
  }
}
