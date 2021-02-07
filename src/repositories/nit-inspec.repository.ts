import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {NitInspec, NitInspecRelations} from '../models';

export class NitInspecRepository extends DefaultCrudRepository<
  NitInspec,
  typeof NitInspec.prototype.Id,
  NitInspecRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(NitInspec, dataSource);
  }
}
