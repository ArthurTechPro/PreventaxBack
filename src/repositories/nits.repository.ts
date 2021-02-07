import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Nits, NitsRelations} from '../models';

export class NitsRepository extends DefaultCrudRepository<
  Nits,
  typeof Nits.prototype.Nit,
  NitsRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Nits, dataSource);
  }
}
