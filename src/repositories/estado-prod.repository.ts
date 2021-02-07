import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {EstadoProd, EstadoProdRelations} from '../models';

export class EstadoProdRepository extends DefaultCrudRepository<
  EstadoProd,
  typeof EstadoProd.prototype.Id,
  EstadoProdRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(EstadoProd, dataSource);
  }
}
