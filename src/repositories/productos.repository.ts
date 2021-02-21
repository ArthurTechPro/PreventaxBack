import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Productos, ProductosRelations, Revisiones, Inspecciones} from '../models';
import {RevisionesRepository} from './revisiones.repository';
import {InspeccionesRepository} from './inspecciones.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.Id,
  ProductosRelations
> {

  public readonly FKProductoRevision: HasManyRepositoryFactory<Revisiones, typeof Productos.prototype.Id>;

  public readonly FKProducInspec: HasManyRepositoryFactory<Inspecciones, typeof Productos.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Productos, dataSource);
    this.FKProducInspec = this.createHasManyRepositoryFactoryFor('FKProducInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('FKProducInspec', this.FKProducInspec.inclusionResolver);
    this.FKProductoRevision = this.createHasManyRepositoryFactoryFor('FKProductoRevision', revisionesRepositoryGetter,);
    this.registerInclusionResolver('FKProductoRevision', this.FKProductoRevision.inclusionResolver);
  }
}
