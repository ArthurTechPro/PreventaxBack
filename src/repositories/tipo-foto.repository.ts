import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoFoto, TipoFotoRelations} from '../models';

export class TipoFotoRepository extends DefaultCrudRepository<
  TipoFoto,
  typeof TipoFoto.prototype.Id,
  TipoFotoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(TipoFoto, dataSource);
  }
}
