import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {ValorInspec, ValorInspecRelations} from '../models';

export class ValorInspecRepository extends DefaultCrudRepository<
  ValorInspec,
  typeof ValorInspec.prototype.Id,
  ValorInspecRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(ValorInspec, dataSource);
  }
}
