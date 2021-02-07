import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Preguntas, PreguntasRelations, Observacion} from '../models';
import {ObservacionRepository} from './observacion.repository';

export class PreguntasRepository extends DefaultCrudRepository<
  Preguntas,
  typeof Preguntas.prototype.Id,
  PreguntasRelations
> {

  public readonly FKPregObs: HasManyRepositoryFactory<Observacion, typeof Preguntas.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('ObservacionRepository') protected observacionRepositoryGetter: Getter<ObservacionRepository>,
  ) {
    super(Preguntas, dataSource);
    this.FKPregObs = this.createHasManyRepositoryFactoryFor('FKPregObs', observacionRepositoryGetter,);
  }
}
