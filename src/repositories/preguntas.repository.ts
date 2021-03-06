import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Preguntas, PreguntasRelations, Observaciones, FotoInspec} from '../models';
import {ObservacionesRepository} from './observaciones.repository';
import {FotoInspecRepository} from './foto-inspec.repository';

export class PreguntasRepository extends DefaultCrudRepository<
  Preguntas,
  typeof Preguntas.prototype.Id,
  PreguntasRelations
> {

  public readonly FKPreguntaObserva: HasManyRepositoryFactory<Observaciones, typeof Preguntas.prototype.Id>;

  public readonly FKPreguntFoto: HasManyRepositoryFactory<FotoInspec, typeof Preguntas.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ObservacionesRepository') protected observacionesRepositoryGetter: Getter<ObservacionesRepository>, @repository.getter('FotoInspecRepository') protected fotoInspecRepositoryGetter: Getter<FotoInspecRepository>,
  ) {
    super(Preguntas, dataSource);
    this.FKPreguntFoto = this.createHasManyRepositoryFactoryFor('FKPreguntFoto', fotoInspecRepositoryGetter,);
    this.FKPreguntaObserva = this.createHasManyRepositoryFactoryFor('FKPreguntaObserva', observacionesRepositoryGetter,);
  }
}
