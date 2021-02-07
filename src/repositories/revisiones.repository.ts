import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Revisiones, RevisionesRelations} from '../models';

export class RevisionesRepository extends DefaultCrudRepository<
  Revisiones,
  typeof Revisiones.prototype.Id,
  RevisionesRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Revisiones, dataSource);
  }
}
