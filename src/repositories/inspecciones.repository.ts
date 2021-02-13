import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {FotoInspec, Inspecciones, InspeccionesRelations, NitInspec, Observaciones, ValoresInspec} from '../models';
import {FotoInspecRepository} from './foto-inspec.repository';
import {NitInspecRepository} from './nit-inspec.repository';
import {ObservacionesRepository} from './observaciones.repository';
import {ValoresInspecRepository} from './valores-inspec.repository';

export class InspeccionesRepository extends DefaultCrudRepository<
  Inspecciones,
  typeof Inspecciones.prototype.Id,
  InspeccionesRelations
  > {

  public readonly InspecNit: HasManyRepositoryFactory<NitInspec, typeof Inspecciones.prototype.Id>;

  public readonly InspecVal: HasManyRepositoryFactory<ValoresInspec, typeof Inspecciones.prototype.Id>;

  public readonly InspecFoto: HasManyRepositoryFactory<FotoInspec, typeof Inspecciones.prototype.Id>;

  public readonly InspecObs: HasManyRepositoryFactory<Observaciones, typeof Inspecciones.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>,
    @repository.getter('ValoresInspecRepository') protected valoresInspecRepositoryGetter: Getter<ValoresInspecRepository>,
    @repository.getter('FotoInspecRepository') protected fotoInspecRepositoryGetter: Getter<FotoInspecRepository>,
    @repository.getter('ObservacionesRepository') protected observacionesRepositoryGetter: Getter<ObservacionesRepository>,
  ) {
    super(Inspecciones, dataSource);
    this.InspecObs = this.createHasManyRepositoryFactoryFor('InspecObs', observacionesRepositoryGetter,);
    this.registerInclusionResolver('InspecObs', this.InspecObs.inclusionResolver);
    this.InspecFoto = this.createHasManyRepositoryFactoryFor('InspecFoto', fotoInspecRepositoryGetter,);
    this.registerInclusionResolver('InspecFoto', this.InspecFoto.inclusionResolver);
    this.InspecVal = this.createHasManyRepositoryFactoryFor('InspecVal', valoresInspecRepositoryGetter,);
    this.registerInclusionResolver('InspecVal', this.InspecVal.inclusionResolver);
    this.InspecNit = this.createHasManyRepositoryFactoryFor('InspecNit', nitInspecRepositoryGetter,);
    this.registerInclusionResolver('InspecNit', this.InspecNit.inclusionResolver);
  }
}

