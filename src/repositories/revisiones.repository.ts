import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Revisiones, RevisionesRelations, Comentarios, Preguntas} from '../models';
import {ComentariosRepository} from './comentarios.repository';
import {PreguntasRepository} from './preguntas.repository';

export class RevisionesRepository extends DefaultCrudRepository<
  Revisiones,
  typeof Revisiones.prototype.Id,
  RevisionesRelations
> {

  public readonly FKRevComent: HasManyRepositoryFactory<Comentarios, typeof Revisiones.prototype.Id>;

  public readonly KFRevPreg: HasManyRepositoryFactory<Preguntas, typeof Revisiones.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('ComentariosRepository') protected comentariosRepositoryGetter: Getter<ComentariosRepository>, @repository.getter('PreguntasRepository') protected preguntasRepositoryGetter: Getter<PreguntasRepository>,
  ) {
    super(Revisiones, dataSource);
    this.KFRevPreg = this.createHasManyRepositoryFactoryFor('KFRevPreg', preguntasRepositoryGetter,);
    this.FKRevComent = this.createHasManyRepositoryFactoryFor('FKRevComent', comentariosRepositoryGetter,);
  }
}
