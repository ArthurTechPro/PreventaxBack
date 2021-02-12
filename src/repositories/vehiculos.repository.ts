import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Vehiculos, VehiculosRelations} from '../models';

export class VehiculosRepository extends DefaultCrudRepository<
  Vehiculos,
  typeof Vehiculos.prototype.Placa,
  VehiculosRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Vehiculos, dataSource);
  }
}
