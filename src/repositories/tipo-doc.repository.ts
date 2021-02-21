import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Nits, TipoDoc, TipoDocRelations} from '../models';
import {NitsRepository} from './nits.repository';

export class TipoDocRepository extends DefaultCrudRepository<
  TipoDoc,
  typeof TipoDoc.prototype.Id,
  TipoDocRelations
  > {

  public readonly FKTipoDocNIt: HasManyRepositoryFactory<Nits, typeof TipoDoc.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(TipoDoc, dataSource);
    this.FKTipoDocNIt = this.createHasManyRepositoryFactoryFor('FKTipoDocNIt', nitsRepositoryGetter,);
  }
}
