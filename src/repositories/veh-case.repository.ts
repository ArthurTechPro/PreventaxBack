import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {VehCase, VehCaseRelations} from '../models';

export class VehCaseRepository extends DefaultCrudRepository<
  VehCase,
  typeof VehCase.prototype.Codigo,
  VehCaseRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(VehCase, dataSource);
  }
}
