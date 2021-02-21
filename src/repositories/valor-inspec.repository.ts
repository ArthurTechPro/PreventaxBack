import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ValorInspec, ValorInspecRelations} from '../models';

export class ValorInspecRepository extends DefaultCrudRepository<
  ValorInspec,
  typeof ValorInspec.prototype.Id,
  ValorInspecRelations
  > {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(ValorInspec, dataSource);
  }
}
