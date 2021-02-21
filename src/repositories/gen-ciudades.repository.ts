import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {GenCiudades, GenCiudadesRelations, Nits} from '../models';
import {NitsRepository} from './nits.repository';

export class GenCiudadesRepository extends DefaultCrudRepository<
  GenCiudades,
  typeof GenCiudades.prototype.IdCiudad,
  GenCiudadesRelations
  > {

  public readonly FKCiuNit: HasManyRepositoryFactory<Nits, typeof GenCiudades.prototype.IdCiudad>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(GenCiudades, dataSource);
    this.FKCiuNit = this.createHasManyRepositoryFactoryFor('FKCiuNit', nitsRepositoryGetter,);
  }
}
