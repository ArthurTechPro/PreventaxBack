import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoUsu, EstadoUsuRelations} from '../models';

export class EstadoUsuRepository extends DefaultCrudRepository<
  EstadoUsu,
  typeof EstadoUsu.prototype.Id,
  EstadoUsuRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(EstadoUsu, dataSource);
  }
}
