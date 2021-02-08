import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Vehiculos, VehiculosRelations, Inspecciones} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';

export class VehiculosRepository extends DefaultCrudRepository<
  Vehiculos,
  typeof Vehiculos.prototype.Placa,
  VehiculosRelations
> {

  public readonly FKVehInspec: HasManyRepositoryFactory<Inspecciones, typeof Vehiculos.prototype.Placa>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Vehiculos, dataSource);
    this.FKVehInspec = this.createHasManyRepositoryFactoryFor('FKVehInspec', inspeccionesRepositoryGetter,);
  }
}
