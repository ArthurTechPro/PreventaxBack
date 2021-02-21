import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoComent, TipoComentRelations, Comentarios} from '../models';
import {ComentariosRepository} from './comentarios.repository';

export class TipoComentRepository extends DefaultCrudRepository<
  TipoComent,
  typeof TipoComent.prototype.Id,
  TipoComentRelations
> {

  public readonly FKTipComet: HasManyRepositoryFactory<Comentarios, typeof TipoComent.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ComentariosRepository') protected comentariosRepositoryGetter: Getter<ComentariosRepository>,
  ) {
    super(TipoComent, dataSource);
    this.FKTipComet = this.createHasManyRepositoryFactoryFor('FKTipComet', comentariosRepositoryGetter,);
  }
}
