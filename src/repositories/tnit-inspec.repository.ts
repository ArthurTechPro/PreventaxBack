import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {NitInspec, TnitInspec, TnitInspecRelations} from '../models';
import {NitInspecRepository} from './nit-inspec.repository';

export class TnitInspecRepository extends DefaultCrudRepository<
  TnitInspec,
  typeof TnitInspec.prototype.Id,
  TnitInspecRelations
  > {

  public readonly FKTipoNit: HasManyRepositoryFactory<NitInspec, typeof TnitInspec.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>,
  ) {
    super(TnitInspec, dataSource);
    this.FKTipoNit = this.createHasManyRepositoryFactoryFor('FKTipoNit', nitInspecRepositoryGetter,);
  }
}
