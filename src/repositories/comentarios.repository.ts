import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Comentarios, ComentariosRelations} from '../models';

export class ComentariosRepository extends DefaultCrudRepository<
  Comentarios,
  typeof Comentarios.prototype.Id,
  ComentariosRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Comentarios, dataSource);
  }
}
