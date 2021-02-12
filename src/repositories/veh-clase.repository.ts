import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VehClase, VehClaseRelations} from '../models';

export class VehClaseRepository extends DefaultCrudRepository<
  VehClase,
  typeof VehClase.prototype.Codigo,
  VehClaseRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(VehClase, dataSource);
  }
}
