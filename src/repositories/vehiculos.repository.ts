import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Inspecciones, Vehiculos, VehiculosRelations} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';

export class VehiculosRepository extends DefaultCrudRepository<
  Vehiculos,
  typeof Vehiculos.prototype.Placa,
  VehiculosRelations
  > {

  public readonly FKVehiculoInspec: HasManyRepositoryFactory<Inspecciones, typeof Vehiculos.prototype.Placa>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Vehiculos, dataSource);
    this.FKVehiculoInspec = this.createHasManyRepositoryFactoryFor('FKVehiculoInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('FKVehiculoInspec', this.FKVehiculoInspec.inclusionResolver);
  }
}
