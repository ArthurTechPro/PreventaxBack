import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Preguntas, Revisiones, RevisionesRelations, Observaciones} from '../models';
import {PreguntasRepository} from './preguntas.repository';
import {ObservacionesRepository} from './observaciones.repository';

export class RevisionesRepository extends DefaultCrudRepository<
  Revisiones,
  typeof Revisiones.prototype.Id,
  RevisionesRelations
  > {

  public readonly RevPre: HasManyRepositoryFactory<Preguntas, typeof Revisiones.prototype.Id>;

  public readonly RevisionObs: HasManyRepositoryFactory<Observaciones, typeof Revisiones.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('PreguntasRepository') protected preguntasRepositoryGetter: Getter<PreguntasRepository>, @repository.getter('ObservacionesRepository') protected observacionesRepositoryGetter: Getter<ObservacionesRepository>,
  ) {
    super(Revisiones, dataSource);
    this.RevisionObs = this.createHasManyRepositoryFactoryFor('RevisionObs', observacionesRepositoryGetter,);
    this.registerInclusionResolver('RevisionObs', this.RevisionObs.inclusionResolver);
    this.RevPre = this.createHasManyRepositoryFactoryFor('RevPre', preguntasRepositoryGetter,);
    this.registerInclusionResolver('RevPre', this.RevPre.inclusionResolver);
  }
}
