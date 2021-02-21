import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {GenCiudades, GenDeptos, GenDeptosRelations} from '../models';
import {GenCiudadesRepository} from './gen-ciudades.repository';

export class GenDeptosRepository extends DefaultCrudRepository<
  GenDeptos,
  typeof GenDeptos.prototype.IdDepto,
  GenDeptosRelations
  > {

  public readonly FKDeptosCiudad: HasManyRepositoryFactory<GenCiudades, typeof GenDeptos.prototype.IdDepto>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('GenCiudadesRepository') protected genCiudadesRepositoryGetter: Getter<GenCiudadesRepository>,
  ) {
    super(GenDeptos, dataSource);
    this.FKDeptosCiudad = this.createHasManyRepositoryFactoryFor('FKDeptosCiudad', genCiudadesRepositoryGetter,);
    this.registerInclusionResolver('FKDeptosCiudad', this.FKDeptosCiudad.inclusionResolver);
  }
}
