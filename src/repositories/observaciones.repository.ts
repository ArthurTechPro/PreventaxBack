import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Observaciones, ObservacionesRelations} from '../models';

export class ObservacionesRepository extends DefaultCrudRepository<
  Observaciones,
  typeof Observaciones.prototype.Id,
  ObservacionesRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Observaciones, dataSource);
  }
}
