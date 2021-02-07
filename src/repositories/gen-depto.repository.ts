import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {GenDepto, GenDeptoRelations, GenCiuddes} from '../models';
import {GenCiuddesRepository} from './gen-ciuddes.repository';

export class GenDeptoRepository extends DefaultCrudRepository<
  GenDepto,
  typeof GenDepto.prototype.Codigo,
  GenDeptoRelations
> {

  public readonly FKDepCiu: HasManyRepositoryFactory<GenCiuddes, typeof GenDepto.prototype.Codigo>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('GenCiuddesRepository') protected genCiuddesRepositoryGetter: Getter<GenCiuddesRepository>,
  ) {
    super(GenDepto, dataSource);
    this.FKDepCiu = this.createHasManyRepositoryFactoryFor('FKDepCiu', genCiuddesRepositoryGetter,);
    this.registerInclusionResolver('FKDepCiu', this.FKDepCiu.inclusionResolver);
  }
}
