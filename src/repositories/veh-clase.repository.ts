import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VehClase, VehClaseRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class VehClaseRepository extends DefaultCrudRepository<
  VehClase,
  typeof VehClase.prototype.Codigo,
  VehClaseRelations
> {

  public readonly ClaVeh: HasManyRepositoryFactory<Vehiculos, typeof VehClase.prototype.Codigo>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(VehClase, dataSource);
    this.ClaVeh = this.createHasManyRepositoryFactoryFor('ClaVeh', vehiculosRepositoryGetter,);
  }
}
