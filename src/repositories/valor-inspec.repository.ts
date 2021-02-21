import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ValorInspec, ValorInspecRelations} from '../models';

export class ValorInspecRepository extends DefaultCrudRepository<
  ValorInspec,
  typeof ValorInspec.prototype.Id,
  ValorInspecRelations
  > {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(ValorInspec, dataSource);
  }
}
