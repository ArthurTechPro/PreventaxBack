import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ValoresInspec, ValoresInspecRelations} from '../models';

export class ValoresInspecRepository extends DefaultCrudRepository<
  ValoresInspec,
  typeof ValoresInspec.prototype.Id,
  ValoresInspecRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(ValoresInspec, dataSource);
  }
}
