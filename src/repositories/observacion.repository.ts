import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Observacion, ObservacionRelations} from '../models';

export class ObservacionRepository extends DefaultCrudRepository<
  Observacion,
  typeof Observacion.prototype.Id,
  ObservacionRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Observacion, dataSource);
  }
}
