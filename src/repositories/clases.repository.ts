import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Clases, ClasesRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class ClasesRepository extends DefaultCrudRepository<
  Clases,
  typeof Clases.prototype.id,
  ClasesRelations
> {

  public readonly FKClaseVeh: HasManyRepositoryFactory<Vehiculos, typeof Clases.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Clases, dataSource);
    this.FKClaseVeh = this.createHasManyRepositoryFactoryFor('FKClaseVeh', vehiculosRepositoryGetter,);
  }
}
