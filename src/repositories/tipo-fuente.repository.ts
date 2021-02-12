import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoFuente, TipoFuenteRelations} from '../models';

export class TipoFuenteRepository extends DefaultCrudRepository<
  TipoFuente,
  typeof TipoFuente.prototype.Id,
  TipoFuenteRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(TipoFuente, dataSource);
  }
}
