import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {VehMarca, VehMarcaRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class VehMarcaRepository extends DefaultCrudRepository<
  VehMarca,
  typeof VehMarca.prototype.Codigo,
  VehMarcaRelations
> {

  public readonly FKMarVeh: HasManyRepositoryFactory<Vehiculos, typeof VehMarca.prototype.Codigo>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(VehMarca, dataSource);
    this.FKMarVeh = this.createHasManyRepositoryFactoryFor('FKMarVeh', vehiculosRepositoryGetter,);
  }
}
