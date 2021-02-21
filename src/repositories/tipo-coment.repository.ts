import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Comentarios, TipoComent, TipoComentRelations} from '../models';
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
