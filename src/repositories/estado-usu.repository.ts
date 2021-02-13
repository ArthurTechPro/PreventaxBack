import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoUsu, EstadoUsuRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class EstadoUsuRepository extends DefaultCrudRepository<
  EstadoUsu,
  typeof EstadoUsu.prototype.Id,
  EstadoUsuRelations
> {

  public readonly EstUsu: HasManyRepositoryFactory<Usuarios, typeof EstadoUsu.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(EstadoUsu, dataSource);
    this.EstUsu = this.createHasManyRepositoryFactoryFor('EstUsu', usuariosRepositoryGetter,);
  }
}
