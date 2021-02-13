import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoProd, EstadoProdRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class EstadoProdRepository extends DefaultCrudRepository<
  EstadoProd,
  typeof EstadoProd.prototype.Id,
  EstadoProdRelations
> {

  public readonly EstProd: HasManyRepositoryFactory<Productos, typeof EstadoProd.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(EstadoProd, dataSource);
    this.EstProd = this.createHasManyRepositoryFactoryFor('EstProd', productosRepositoryGetter,);
  }
}
