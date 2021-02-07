import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TnitInspec, TnitInspecRelations} from '../models';

export class TnitInspecRepository extends DefaultCrudRepository<
  TnitInspec,
  typeof TnitInspec.prototype.Id,
  TnitInspecRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(TnitInspec, dataSource);
  }
}
