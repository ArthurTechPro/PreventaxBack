import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Inspecciones, InspeccionesRelations, NitInspec, ValorInspec, FotoInspec, Observaciones} from '../models';
import {NitInspecRepository} from './nit-inspec.repository';
import {ValorInspecRepository} from './valor-inspec.repository';
import {FotoInspecRepository} from './foto-inspec.repository';
import {ObservacionesRepository} from './observaciones.repository';

export class InspeccionesRepository extends DefaultCrudRepository<
  Inspecciones,
  typeof Inspecciones.prototype.Id,
  InspeccionesRelations
> {

  public readonly FKInpecNits: HasManyRepositoryFactory<NitInspec, typeof Inspecciones.prototype.Id>;

  public readonly FKInspecValor: HasManyRepositoryFactory<ValorInspec, typeof Inspecciones.prototype.Id>;

  public readonly FKInspecFoto: HasManyRepositoryFactory<FotoInspec, typeof Inspecciones.prototype.Id>;

  public readonly FKInspecObserva: HasManyRepositoryFactory<Observaciones, typeof Inspecciones.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>, @repository.getter('ValorInspecRepository') protected valorInspecRepositoryGetter: Getter<ValorInspecRepository>, @repository.getter('FotoInspecRepository') protected fotoInspecRepositoryGetter: Getter<FotoInspecRepository>, @repository.getter('ObservacionesRepository') protected observacionesRepositoryGetter: Getter<ObservacionesRepository>,
  ) {
    super(Inspecciones, dataSource);
    this.FKInspecObserva = this.createHasManyRepositoryFactoryFor('FKInspecObserva', observacionesRepositoryGetter,);
    this.registerInclusionResolver('FKInspecObserva', this.FKInspecObserva.inclusionResolver);
    this.FKInspecFoto = this.createHasManyRepositoryFactoryFor('FKInspecFoto', fotoInspecRepositoryGetter,);
    this.registerInclusionResolver('FKInspecFoto', this.FKInspecFoto.inclusionResolver);
    this.FKInspecValor = this.createHasManyRepositoryFactoryFor('FKInspecValor', valorInspecRepositoryGetter,);
    this.registerInclusionResolver('FKInspecValor', this.FKInspecValor.inclusionResolver);
    this.FKInpecNits = this.createHasManyRepositoryFactoryFor('FKInpecNits', nitInspecRepositoryGetter,);
    this.registerInclusionResolver('FKInpecNits', this.FKInpecNits.inclusionResolver);
  }
}
