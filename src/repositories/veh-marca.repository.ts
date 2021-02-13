import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VehMarca, VehMarcaRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class VehMarcaRepository extends DefaultCrudRepository<
  VehMarca,
  typeof VehMarca.prototype.Codigo,
  VehMarcaRelations
> {

  public readonly MarVeh: HasManyRepositoryFactory<Vehiculos, typeof VehMarca.prototype.Codigo>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(VehMarca, dataSource);
    this.MarVeh = this.createHasManyRepositoryFactoryFor('MarVeh', vehiculosRepositoryGetter,);
  }
}
