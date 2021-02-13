import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {GenDeptos, GenDeptosRelations, GenCiudades} from '../models';
import {GenCiudadesRepository} from './gen-ciudades.repository';

export class GenDeptosRepository extends DefaultCrudRepository<
  GenDeptos,
  typeof GenDeptos.prototype.Codigo,
  GenDeptosRelations
  > {

  public readonly DepCiu: HasManyRepositoryFactory<GenCiudades, typeof GenDeptos.prototype.Codigo>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('GenCiudadesRepository') protected genCiudadesRepositoryGetter: Getter<GenCiudadesRepository>,
  ) {
    super(GenDeptos, dataSource);
    this.DepCiu = this.createHasManyRepositoryFactoryFor('DepCiu', genCiudadesRepositoryGetter,);
    this.registerInclusionResolver('DepCiu', this.DepCiu.inclusionResolver);
  }
}
