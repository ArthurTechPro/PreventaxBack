import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {EstadoProd, EstadoProdRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class EstadoProdRepository extends DefaultCrudRepository<
  EstadoProd,
  typeof EstadoProd.prototype.Id,
  EstadoProdRelations
> {

  public readonly FKEstProd: HasManyRepositoryFactory<Productos, typeof EstadoProd.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(EstadoProd, dataSource);
    this.FKEstProd = this.createHasManyRepositoryFactoryFor('FKEstProd', productosRepositoryGetter,);
  }
}
