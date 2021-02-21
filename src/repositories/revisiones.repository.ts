import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Revisiones, RevisionesRelations, Comentarios, Preguntas} from '../models';
import {ComentariosRepository} from './comentarios.repository';
import {PreguntasRepository} from './preguntas.repository';

export class RevisionesRepository extends DefaultCrudRepository<
  Revisiones,
  typeof Revisiones.prototype.Id,
  RevisionesRelations
> {

  public readonly FKRevisionComet: HasManyRepositoryFactory<Comentarios, typeof Revisiones.prototype.Id>;

  public readonly FKRevisPregunta: HasManyRepositoryFactory<Preguntas, typeof Revisiones.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ComentariosRepository') protected comentariosRepositoryGetter: Getter<ComentariosRepository>, @repository.getter('PreguntasRepository') protected preguntasRepositoryGetter: Getter<PreguntasRepository>,
  ) {
    super(Revisiones, dataSource);
    this.FKRevisPregunta = this.createHasManyRepositoryFactoryFor('FKRevisPregunta', preguntasRepositoryGetter,);
    this.registerInclusionResolver('FKRevisPregunta', this.FKRevisPregunta.inclusionResolver);
    this.FKRevisionComet = this.createHasManyRepositoryFactoryFor('FKRevisionComet', comentariosRepositoryGetter,);
    this.registerInclusionResolver('FKRevisionComet', this.FKRevisionComet.inclusionResolver);
  }
}
