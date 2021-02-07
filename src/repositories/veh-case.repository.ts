import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {VehCase, VehCaseRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class VehCaseRepository extends DefaultCrudRepository<
  VehCase,
  typeof VehCase.prototype.Codigo,
  VehCaseRelations
> {

  public readonly FKClaVeh: HasManyRepositoryFactory<Vehiculos, typeof VehCase.prototype.Codigo>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(VehCase, dataSource);
    this.FKClaVeh = this.createHasManyRepositoryFactoryFor('FKClaVeh', vehiculosRepositoryGetter,);
  }
}
