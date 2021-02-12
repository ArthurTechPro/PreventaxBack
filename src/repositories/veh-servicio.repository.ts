import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VehServicio, VehServicioRelations} from '../models';

export class VehServicioRepository extends DefaultCrudRepository<
  VehServicio,
  typeof VehServicio.prototype.Codigo,
  VehServicioRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(VehServicio, dataSource);
  }
}
