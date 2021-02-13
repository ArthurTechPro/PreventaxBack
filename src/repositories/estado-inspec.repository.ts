import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoInspec, EstadoInspecRelations, Inspecciones} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';

export class EstadoInspecRepository extends DefaultCrudRepository<
  EstadoInspec,
  typeof EstadoInspec.prototype.Id,
  EstadoInspecRelations
> {

  public readonly EstInspec: HasManyRepositoryFactory<Inspecciones, typeof EstadoInspec.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(EstadoInspec, dataSource);
    this.EstInspec = this.createHasManyRepositoryFactoryFor('EstInspec', inspeccionesRepositoryGetter,);
  }
}
