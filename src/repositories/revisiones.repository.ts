import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Revisiones, RevisionesRelations} from '../models';

export class RevisionesRepository extends DefaultCrudRepository<
  Revisiones,
  typeof Revisiones.prototype.Id,
  RevisionesRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Revisiones, dataSource);
  }
}
