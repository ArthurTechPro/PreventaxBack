import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {EstadoUsu, EstadoUsuRelations} from '../models';

export class EstadoUsuRepository extends DefaultCrudRepository<
  EstadoUsu,
  typeof EstadoUsu.prototype.Id,
  EstadoUsuRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(EstadoUsu, dataSource);
  }
}
