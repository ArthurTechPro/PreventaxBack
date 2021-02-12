import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VehMarca, VehMarcaRelations} from '../models';

export class VehMarcaRepository extends DefaultCrudRepository<
  VehMarca,
  typeof VehMarca.prototype.Codigo,
  VehMarcaRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(VehMarca, dataSource);
  }
}
