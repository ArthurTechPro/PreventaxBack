import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {GuiaValores, GuiaValoresRelations} from '../models';

export class GuiaValoresRepository extends DefaultCrudRepository<
  GuiaValores,
  typeof GuiaValores.prototype.Codigo,
  GuiaValoresRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(GuiaValores, dataSource);
  }
}
