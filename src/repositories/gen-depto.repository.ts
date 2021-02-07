import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {GenDepto, GenDeptoRelations} from '../models';

export class GenDeptoRepository extends DefaultCrudRepository<
  GenDepto,
  typeof GenDepto.prototype.Codigo,
  GenDeptoRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(GenDepto, dataSource);
  }
}
