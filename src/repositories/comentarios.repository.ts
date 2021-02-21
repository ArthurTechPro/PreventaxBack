import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Comentarios, ComentariosRelations} from '../models';

export class ComentariosRepository extends DefaultCrudRepository<
  Comentarios,
  typeof Comentarios.prototype.Id,
  ComentariosRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Comentarios, dataSource);
  }
}
