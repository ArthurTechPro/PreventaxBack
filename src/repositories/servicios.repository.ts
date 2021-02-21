import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Servicios, ServiciosRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.Id,
  ServiciosRelations
> {

  public readonly FKServicioVeh: HasManyRepositoryFactory<Vehiculos, typeof Servicios.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Servicios, dataSource);
    this.FKServicioVeh = this.createHasManyRepositoryFactoryFor('FKServicioVeh', vehiculosRepositoryGetter,);
  }
}
