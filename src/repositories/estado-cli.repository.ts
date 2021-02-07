import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {EstadoCli, EstadoCliRelations} from '../models';

export class EstadoCliRepository extends DefaultCrudRepository<
  EstadoCli,
  typeof EstadoCli.prototype.Id,
  EstadoCliRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(EstadoCli, dataSource);
  }
}
