import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoDoc, TipoDocRelations} from '../models';

export class TipoDocRepository extends DefaultCrudRepository<
  TipoDoc,
  typeof TipoDoc.prototype.Id,
  TipoDocRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(TipoDoc, dataSource);
  }
}
