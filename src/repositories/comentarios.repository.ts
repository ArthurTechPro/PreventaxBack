import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Comentarios, ComentariosRelations} from '../models';
import {RevisionesRepository} from './revisiones.repository';

export class ComentariosRepository extends DefaultCrudRepository<
  Comentarios,
  typeof Comentarios.prototype.Id,
  ComentariosRelations
  > {

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Comentarios, dataSource);
  }
}
