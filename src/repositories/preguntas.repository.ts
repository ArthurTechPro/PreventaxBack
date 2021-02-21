import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {FotoInspec, Observaciones, Preguntas, PreguntasRelations} from '../models';
import {FotoInspecRepository} from './foto-inspec.repository';
import {ObservacionesRepository} from './observaciones.repository';

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
