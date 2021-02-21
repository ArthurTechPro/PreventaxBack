import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Ciudades, Deptos, DeptosRelations} from '../models';
import {CiudadesRepository} from './ciudades.repository';

export class DeptosRepository extends DefaultCrudRepository<
  Deptos,
  typeof Deptos.prototype.IdDepto,
  DeptosRelations
  > {

  public readonly FKDeptosCiudad: HasManyRepositoryFactory<Ciudades, typeof Deptos.prototype.IdDepto>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('GenCiudadesRepository') protected genCiudadesRepositoryGetter: Getter<CiudadesRepository>,
  ) {
    super(Deptos, dataSource);
    this.FKDeptosCiudad = this.createHasManyRepositoryFactoryFor('FKDeptosCiudad', genCiudadesRepositoryGetter,);
    this.registerInclusionResolver('FKDeptosCiudad', this.FKDeptosCiudad.inclusionResolver);
  }
}
