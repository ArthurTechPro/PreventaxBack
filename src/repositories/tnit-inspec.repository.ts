import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TnitInspec, TnitInspecRelations, NitInspec} from '../models';
import {NitInspecRepository} from './nit-inspec.repository';

export class TnitInspecRepository extends DefaultCrudRepository<
  TnitInspec,
  typeof TnitInspec.prototype.Id,
  TnitInspecRelations
> {

  public readonly TnitInspec: HasManyRepositoryFactory<NitInspec, typeof TnitInspec.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>,
  ) {
    super(TnitInspec, dataSource);
    this.TnitInspec = this.createHasManyRepositoryFactoryFor('TnitInspec', nitInspecRepositoryGetter,);
  }
}
