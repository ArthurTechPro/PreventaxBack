import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VehServicio, VehServicioRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class VehServicioRepository extends DefaultCrudRepository<
  VehServicio,
  typeof VehServicio.prototype.Codigo,
  VehServicioRelations
> {

  public readonly SerVeh: HasManyRepositoryFactory<Vehiculos, typeof VehServicio.prototype.Codigo>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(VehServicio, dataSource);
    this.SerVeh = this.createHasManyRepositoryFactoryFor('SerVeh', vehiculosRepositoryGetter,);
  }
}
