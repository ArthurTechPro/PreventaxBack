import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoUsu, EstadoUsuRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class EstadoUsuRepository extends DefaultCrudRepository<
  EstadoUsu,
  typeof EstadoUsu.prototype.IdEstado,
  EstadoUsuRelations
  > {

  public readonly FKEstadoUsu: HasManyRepositoryFactory<Usuarios, typeof EstadoUsu.prototype.IdEstado>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(EstadoUsu, dataSource);
    this.FKEstadoUsu = this.createHasManyRepositoryFactoryFor('FKEstadoUsu', usuariosRepositoryGetter,);
  }
}
