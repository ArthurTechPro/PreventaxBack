import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Inspecciones} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.Id,
  UsuariosRelations
> {

  public readonly UsrInspec: HasManyRepositoryFactory<Inspecciones, typeof Usuarios.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.UsrInspec = this.createHasManyRepositoryFactoryFor('UsrInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('UsrInspec', this.UsrInspec.inclusionResolver);
  }
}
