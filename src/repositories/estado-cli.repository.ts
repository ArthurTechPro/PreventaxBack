import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoCli, EstadoCliRelations} from '../models';

export class EstadoCliRepository extends DefaultCrudRepository<
  EstadoCli,
  typeof EstadoCli.prototype.Id,
  EstadoCliRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(EstadoCli, dataSource);
  }
}
