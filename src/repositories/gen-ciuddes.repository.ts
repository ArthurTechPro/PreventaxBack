import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {GenCiuddes, GenCiuddesRelations, Nits} from '../models';
import {NitsRepository} from './nits.repository';

export class GenCiuddesRepository extends DefaultCrudRepository<
  GenCiuddes,
  typeof GenCiuddes.prototype.Codigo,
  GenCiuddesRelations
> {

  public readonly FKCiuNit: HasManyRepositoryFactory<Nits, typeof GenCiuddes.prototype.Codigo>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(GenCiuddes, dataSource);
    this.FKCiuNit = this.createHasManyRepositoryFactoryFor('FKCiuNit', nitsRepositoryGetter,);
  }
}
