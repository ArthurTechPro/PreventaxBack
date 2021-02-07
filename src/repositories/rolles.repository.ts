import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Rolles, RollesRelations} from '../models';

export class RollesRepository extends DefaultCrudRepository<
  Rolles,
  typeof Rolles.prototype.Id,
  RollesRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Rolles, dataSource);
  }
}
