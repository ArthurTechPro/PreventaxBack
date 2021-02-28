import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Inspecciones, Nits, Usuarios, UsuariosRelations} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';
import {NitsRepository} from './nits.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.Id,
  UsuariosRelations
  > {

  public readonly btUsuNit: BelongsToAccessor<Nits, typeof Usuarios.prototype.Id>;

  public readonly FKUsuInspec: HasManyRepositoryFactory<Inspecciones, typeof Usuarios.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
    @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.FKUsuInspec = this.createHasManyRepositoryFactoryFor('FKUsuInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('FKUsuInspec', this.FKUsuInspec.inclusionResolver);
    this.btUsuNit = this.createBelongsToAccessorFor('btUsuNit', nitsRepositoryGetter,);
    this.registerInclusionResolver('btUsuNit', this.btUsuNit.inclusionResolver);
  }
}
