import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {GenCiuddes, GenCiuddesRelations} from '../models';

export class GenCiuddesRepository extends DefaultCrudRepository<
  GenCiuddes,
  typeof GenCiuddes.prototype.Codigo,
  GenCiuddesRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(GenCiuddes, dataSource);
  }
}
