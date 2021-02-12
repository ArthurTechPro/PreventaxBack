import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Inspecciones, InspeccionesRelations} from '../models';

export class InspeccionesRepository extends DefaultCrudRepository<
  Inspecciones,
  typeof Inspecciones.prototype.Id,
  InspeccionesRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Inspecciones, dataSource);
  }
}
