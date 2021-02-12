import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {GenCiudades, GenCiudadesRelations} from '../models';

export class GenCiudadesRepository extends DefaultCrudRepository<
  GenCiudades,
  typeof GenCiudades.prototype.Codigo,
  GenCiudadesRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(GenCiudades, dataSource);
  }
}
