import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Productos, ProductosRelations, Inspecciones, Revisiones} from '../models';
import {InspeccionesRepository} from './inspecciones.repository';
import {RevisionesRepository} from './revisiones.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.Id,
  ProductosRelations
> {

  public readonly ProdInspec: HasManyRepositoryFactory<Inspecciones, typeof Productos.prototype.Id>;

  public readonly ProdRev: HasManyRepositoryFactory<Revisiones, typeof Productos.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Productos, dataSource);
    this.ProdRev = this.createHasManyRepositoryFactoryFor('ProdRev', revisionesRepositoryGetter,);
    this.registerInclusionResolver('ProdRev', this.ProdRev.inclusionResolver);
    this.ProdInspec = this.createHasManyRepositoryFactoryFor('ProdInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('ProdInspec', this.ProdInspec.inclusionResolver);
  }
}
