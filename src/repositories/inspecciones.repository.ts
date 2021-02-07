import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Inspecciones, InspeccionesRelations} from '../models';

export class InspeccionesRepository extends DefaultCrudRepository<
  Inspecciones,
  typeof Inspecciones.prototype.Id,
  InspeccionesRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Inspecciones, dataSource);
  }
}
