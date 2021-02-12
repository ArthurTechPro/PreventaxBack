import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Rolles, RollesRelations} from '../models';

export class RollesRepository extends DefaultCrudRepository<
  Rolles,
  typeof Rolles.prototype.Id,
  RollesRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Rolles, dataSource);
  }
}
