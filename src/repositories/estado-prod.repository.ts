import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoProd, EstadoProdRelations} from '../models';

export class EstadoProdRepository extends DefaultCrudRepository<
  EstadoProd,
  typeof EstadoProd.prototype.Id,
  EstadoProdRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(EstadoProd, dataSource);
  }
}
