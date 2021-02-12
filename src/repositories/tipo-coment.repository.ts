import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoComent, TipoComentRelations} from '../models';

export class TipoComentRepository extends DefaultCrudRepository<
  TipoComent,
  typeof TipoComent.prototype.Id,
  TipoComentRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(TipoComent, dataSource);
  }
}
