import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoComentario, TipoComentarioRelations} from '../models';

export class TipoComentarioRepository extends DefaultCrudRepository<
  TipoComentario,
  typeof TipoComentario.prototype.Id,
  TipoComentarioRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(TipoComentario, dataSource);
  }
}
