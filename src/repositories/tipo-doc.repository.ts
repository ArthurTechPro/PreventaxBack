import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoDoc, TipoDocRelations, Nits} from '../models';
import {NitsRepository} from './nits.repository';

export class TipoDocRepository extends DefaultCrudRepository<
  TipoDoc,
  typeof TipoDoc.prototype.Id,
  TipoDocRelations
> {

  public readonly TipDNit: HasManyRepositoryFactory<Nits, typeof TipoDoc.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(TipoDoc, dataSource);
    this.TipDNit = this.createHasManyRepositoryFactoryFor('TipDNit', nitsRepositoryGetter,);
  }
}
