import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Inspecciones, InspeccionesRelations, NitInspec, ValorInspec, FotoInspec, Observacion} from '../models';
import {NitInspecRepository} from './nit-inspec.repository';
import {ValorInspecRepository} from './valor-inspec.repository';
import {FotoInspecRepository} from './foto-inspec.repository';
import {ObservacionRepository} from './observacion.repository';

export class InspeccionesRepository extends DefaultCrudRepository<
  Inspecciones,
  typeof Inspecciones.prototype.Id,
  InspeccionesRelations
> {

  public readonly FKIspNit: HasManyRepositoryFactory<NitInspec, typeof Inspecciones.prototype.Id>;

  public readonly FKInsVal: HasManyRepositoryFactory<ValorInspec, typeof Inspecciones.prototype.Id>;

  public readonly FKInsFoto: HasManyRepositoryFactory<FotoInspec, typeof Inspecciones.prototype.Id>;

  public readonly FKInsObs: HasManyRepositoryFactory<Observacion, typeof Inspecciones.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>, @repository.getter('ValorInspecRepository') protected valorInspecRepositoryGetter: Getter<ValorInspecRepository>, @repository.getter('FotoInspecRepository') protected fotoInspecRepositoryGetter: Getter<FotoInspecRepository>, @repository.getter('ObservacionRepository') protected observacionRepositoryGetter: Getter<ObservacionRepository>,
  ) {
    super(Inspecciones, dataSource);
    this.FKInsObs = this.createHasManyRepositoryFactoryFor('FKInsObs', observacionRepositoryGetter,);
    this.registerInclusionResolver('FKInsObs', this.FKInsObs.inclusionResolver);
    this.FKInsFoto = this.createHasManyRepositoryFactoryFor('FKInsFoto', fotoInspecRepositoryGetter,);
    this.registerInclusionResolver('FKInsFoto', this.FKInsFoto.inclusionResolver);
    this.FKInsVal = this.createHasManyRepositoryFactoryFor('FKInsVal', valorInspecRepositoryGetter,);
    this.FKIspNit = this.createHasManyRepositoryFactoryFor('FKIspNit', nitInspecRepositoryGetter,);
    this.registerInclusionResolver('FKIspNit', this.FKIspNit.inclusionResolver);
  }
}
