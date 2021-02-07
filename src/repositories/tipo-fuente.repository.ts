import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoFuente, TipoFuenteRelations} from '../models';

export class TipoFuenteRepository extends DefaultCrudRepository<
  TipoFuente,
  typeof TipoFuente.prototype.Id,
  TipoFuenteRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(TipoFuente, dataSource);
  }
}
