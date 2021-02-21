import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoInspec, EstadoInspecRelations, Inspecciones} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';

export class EstadoInspecRepository extends DefaultCrudRepository<
  EstadoInspec,
  typeof EstadoInspec.prototype.Id,
  EstadoInspecRelations
  > {

  public readonly FKEstadoInspec: HasManyRepositoryFactory<Inspecciones, typeof EstadoInspec.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(EstadoInspec, dataSource);
    this.FKEstadoInspec = this.createHasManyRepositoryFactoryFor('FKEstadoInspec', inspeccionesRepositoryGetter,);
  }
}
