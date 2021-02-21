import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoFuente, TipoFuenteRelations, ValorInspec} from '../models';
import {ValorInspecRepository} from './valor-inspec.repository';

export class TipoFuenteRepository extends DefaultCrudRepository<
  TipoFuente,
  typeof TipoFuente.prototype.Id,
  TipoFuenteRelations
> {

  public readonly FKTipoFuenteValor: HasManyRepositoryFactory<ValorInspec, typeof TipoFuente.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ValorInspecRepository') protected valorInspecRepositoryGetter: Getter<ValorInspecRepository>,
  ) {
    super(TipoFuente, dataSource);
    this.FKTipoFuenteValor = this.createHasManyRepositoryFactoryFor('FKTipoFuenteValor', valorInspecRepositoryGetter,);
  }
}
