import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {GenCiudades, GenCiudadesRelations, Nits} from '../models';
import {NitsRepository} from './nits.repository';

export class GenCiudadesRepository extends DefaultCrudRepository<
  GenCiudades,
  typeof GenCiudades.prototype.Codigo,
  GenCiudadesRelations
> {

  public readonly CiuNit: HasManyRepositoryFactory<Nits, typeof GenCiudades.prototype.Codigo>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(GenCiudades, dataSource);
    this.CiuNit = this.createHasManyRepositoryFactoryFor('CiuNit', nitsRepositoryGetter,);
  }
}
