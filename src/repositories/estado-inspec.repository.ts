import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoInspec, EstadoInspecRelations} from '../models';

export class EstadoInspecRepository extends DefaultCrudRepository<
  EstadoInspec,
  typeof EstadoInspec.prototype.Id,
  EstadoInspecRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(EstadoInspec, dataSource);
  }
}
