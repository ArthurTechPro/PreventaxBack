import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Ciudades, CiudadesRelations, Nits} from '../models';
import {NitsRepository} from './nits.repository';

export class CiudadesRepository extends DefaultCrudRepository<
  Ciudades,
  typeof Ciudades.prototype.IdCiudad,
  CiudadesRelations
  > {

  public readonly FKCiuNit: HasManyRepositoryFactory<Nits, typeof Ciudades.prototype.IdCiudad>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(Ciudades, dataSource);
    this.FKCiuNit = this.createHasManyRepositoryFactoryFor('FKCiuNit', nitsRepositoryGetter,);
  }
}
