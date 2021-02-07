import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoDoc, TipoDocRelations} from '../models';

export class TipoDocRepository extends DefaultCrudRepository<
  TipoDoc,
  typeof TipoDoc.prototype.Id,
  TipoDocRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(TipoDoc, dataSource);
  }
}
