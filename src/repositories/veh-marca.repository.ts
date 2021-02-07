import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {VehMarca, VehMarcaRelations} from '../models';

export class VehMarcaRepository extends DefaultCrudRepository<
  VehMarca,
  typeof VehMarca.prototype.Codigo,
  VehMarcaRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(VehMarca, dataSource);
  }
}
