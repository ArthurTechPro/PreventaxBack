import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoDoc, TipoDocRelations, Nits} from '../models';
import {NitsRepository} from './nits.repository';

export class TipoDocRepository extends DefaultCrudRepository<
  TipoDoc,
  typeof TipoDoc.prototype.Id,
  TipoDocRelations
> {

  public readonly FKTipoNit: HasManyRepositoryFactory<Nits, typeof TipoDoc.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('NitsRepository') protected nitsRepositoryGetter: Getter<NitsRepository>,
  ) {
    super(TipoDoc, dataSource);
    this.FKTipoNit = this.createHasManyRepositoryFactoryFor('FKTipoNit', nitsRepositoryGetter,);
  }
}
