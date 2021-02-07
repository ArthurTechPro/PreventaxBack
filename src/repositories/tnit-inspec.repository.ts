import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TnitInspec, TnitInspecRelations, NitInspec} from '../models';
import {NitInspecRepository} from './nit-inspec.repository';

export class TnitInspecRepository extends DefaultCrudRepository<
  TnitInspec,
  typeof TnitInspec.prototype.Id,
  TnitInspecRelations
> {

  public readonly FKTipNit: HasManyRepositoryFactory<NitInspec, typeof TnitInspec.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>,
  ) {
    super(TnitInspec, dataSource);
    this.FKTipNit = this.createHasManyRepositoryFactoryFor('FKTipNit', nitInspecRepositoryGetter,);
  }
}
