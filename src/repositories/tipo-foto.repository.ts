import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoFoto, TipoFotoRelations, FotoInspec} from '../models';
import {FotoInspecRepository} from './foto-inspec.repository';

export class TipoFotoRepository extends DefaultCrudRepository<
  TipoFoto,
  typeof TipoFoto.prototype.Id,
  TipoFotoRelations
> {

  public readonly FKTipFoto: HasManyRepositoryFactory<FotoInspec, typeof TipoFoto.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('FotoInspecRepository') protected fotoInspecRepositoryGetter: Getter<FotoInspecRepository>,
  ) {
    super(TipoFoto, dataSource);
    this.FKTipFoto = this.createHasManyRepositoryFactoryFor('FKTipFoto', fotoInspecRepositoryGetter,);
  }
}
