import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoComentario, TipoComentarioRelations, Comentarios} from '../models';
import {ComentariosRepository} from './comentarios.repository';

export class TipoComentarioRepository extends DefaultCrudRepository<
  TipoComentario,
  typeof TipoComentario.prototype.Id,
  TipoComentarioRelations
> {

  public readonly FKTipComent: HasManyRepositoryFactory<Comentarios, typeof TipoComentario.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('ComentariosRepository') protected comentariosRepositoryGetter: Getter<ComentariosRepository>,
  ) {
    super(TipoComentario, dataSource);
    this.FKTipComent = this.createHasManyRepositoryFactoryFor('FKTipComent', comentariosRepositoryGetter,);
  }
}
