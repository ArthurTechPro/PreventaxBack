import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {FotoInspec, FotoInspecRelations} from '../models';

export class FotoInspecRepository extends DefaultCrudRepository<
  FotoInspec,
  typeof FotoInspec.prototype.Id,
  FotoInspecRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(FotoInspec, dataSource);
  }
}
