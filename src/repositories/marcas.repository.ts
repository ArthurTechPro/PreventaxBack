import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Marcas, MarcasRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class MarcasRepository extends DefaultCrudRepository<
  Marcas,
  typeof Marcas.prototype.Id,
  MarcasRelations
> {

  public readonly FKMarcaVeh: HasManyRepositoryFactory<Vehiculos, typeof Marcas.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Marcas, dataSource);
    this.FKMarcaVeh = this.createHasManyRepositoryFactoryFor('FKMarcaVeh', vehiculosRepositoryGetter,);
  }
}
