import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {EstadoInspec, EstadoInspecRelations} from '../models';

export class EstadoInspecRepository extends DefaultCrudRepository<
  EstadoInspec,
  typeof EstadoInspec.prototype.Id,
  EstadoInspecRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(EstadoInspec, dataSource);
  }
}
