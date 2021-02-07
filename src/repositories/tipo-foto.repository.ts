import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoFoto, TipoFotoRelations} from '../models';

export class TipoFotoRepository extends DefaultCrudRepository<
  TipoFoto,
  typeof TipoFoto.prototype.Id,
  TipoFotoRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(TipoFoto, dataSource);
  }
}
