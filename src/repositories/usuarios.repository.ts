import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Inspecciones} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.Id,
  UsuariosRelations
> {

  public readonly FKUsuInspec: HasManyRepositoryFactory<Inspecciones, typeof Usuarios.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.FKUsuInspec = this.createHasManyRepositoryFactoryFor('FKUsuInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('FKUsuInspec', this.FKUsuInspec.inclusionResolver);
  }
}
