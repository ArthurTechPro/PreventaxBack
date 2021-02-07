import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {EstadoInspec, EstadoInspecRelations, Inspecciones} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';

export class EstadoInspecRepository extends DefaultCrudRepository<
  EstadoInspec,
  typeof EstadoInspec.prototype.Id,
  EstadoInspecRelations
> {

  public readonly FKEstInsp: HasManyRepositoryFactory<Inspecciones, typeof EstadoInspec.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(EstadoInspec, dataSource);
    this.FKEstInsp = this.createHasManyRepositoryFactoryFor('FKEstInsp', inspeccionesRepositoryGetter,);
  }
}
