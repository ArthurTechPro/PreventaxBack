import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {FotoInspec, FotoInspecRelations} from '../models';

export class FotoInspecRepository extends DefaultCrudRepository<
  FotoInspec,
  typeof FotoInspec.prototype.Id,
  FotoInspecRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(FotoInspec, dataSource);
  }
}
