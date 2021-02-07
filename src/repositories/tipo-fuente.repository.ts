import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {TipoFuente, TipoFuenteRelations, ValorInspec} from '../models';
import {ValorInspecRepository} from './valor-inspec.repository';

export class TipoFuenteRepository extends DefaultCrudRepository<
  TipoFuente,
  typeof TipoFuente.prototype.Id,
  TipoFuenteRelations
> {

  public readonly KFTipFuente: HasManyRepositoryFactory<ValorInspec, typeof TipoFuente.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('ValorInspecRepository') protected valorInspecRepositoryGetter: Getter<ValorInspecRepository>,
  ) {
    super(TipoFuente, dataSource);
    this.KFTipFuente = this.createHasManyRepositoryFactoryFor('KFTipFuente', valorInspecRepositoryGetter,);
  }
}
