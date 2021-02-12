import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {NitInspec, NitInspecRelations} from '../models';

export class NitInspecRepository extends DefaultCrudRepository<
  NitInspec,
  typeof NitInspec.prototype.Id,
  NitInspecRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(NitInspec, dataSource);
  }
}
