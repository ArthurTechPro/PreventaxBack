import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {VehServicio, VehServicioRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class VehServicioRepository extends DefaultCrudRepository<
  VehServicio,
  typeof VehServicio.prototype.Codigo,
  VehServicioRelations
> {

  public readonly FKSvcVeh: HasManyRepositoryFactory<Vehiculos, typeof VehServicio.prototype.Codigo>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(VehServicio, dataSource);
    this.FKSvcVeh = this.createHasManyRepositoryFactoryFor('FKSvcVeh', vehiculosRepositoryGetter,);
  }
}
