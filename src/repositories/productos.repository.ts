import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Productos, ProductosRelations, Revisiones, Inspecciones} from '../models';
import {RevisionesRepository} from './revisiones.repository';
import {InspeccionesRepository} from './inspecciones.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.Id,
  ProductosRelations
> {

  public readonly FKProRev: HasManyRepositoryFactory<Revisiones, typeof Productos.prototype.Id>;

  public readonly FKProdInspec: HasManyRepositoryFactory<Inspecciones, typeof Productos.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>, @repository.getter('InspeccionesRepository') protected inspeccionesRepositoryGetter: Getter<InspeccionesRepository>,
  ) {
    super(Productos, dataSource);
    this.FKProdInspec = this.createHasManyRepositoryFactoryFor('FKProdInspec', inspeccionesRepositoryGetter,);
    this.registerInclusionResolver('FKProdInspec', this.FKProdInspec.inclusionResolver);
    this.FKProRev = this.createHasManyRepositoryFactoryFor('FKProRev', revisionesRepositoryGetter,);
    this.registerInclusionResolver('FKProRev', this.FKProRev.inclusionResolver);
  }
}
