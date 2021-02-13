import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoFuente, TipoFuenteRelations, ValoresInspec} from '../models';
import {ValoresInspecRepository} from './valores-inspec.repository';

export class TipoFuenteRepository extends DefaultCrudRepository<
  TipoFuente,
  typeof TipoFuente.prototype.Id,
  TipoFuenteRelations
> {

  public readonly TipoVal: HasManyRepositoryFactory<ValoresInspec, typeof TipoFuente.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ValoresInspecRepository') protected valoresInspecRepositoryGetter: Getter<ValoresInspecRepository>,
  ) {
    super(TipoFuente, dataSource);
    this.TipoVal = this.createHasManyRepositoryFactoryFor('TipoVal', valoresInspecRepositoryGetter,);
  }
}
