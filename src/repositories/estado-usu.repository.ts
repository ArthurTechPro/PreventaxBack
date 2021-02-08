import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {EstadoUsu, EstadoUsuRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class EstadoUsuRepository extends DefaultCrudRepository<
  EstadoUsu,
  typeof EstadoUsu.prototype.Id,
  EstadoUsuRelations
  > {

  public readonly FKEstUsu: HasManyRepositoryFactory<Usuarios, typeof EstadoUsu.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(EstadoUsu, dataSource);
    this.FKEstUsu = this.createHasManyRepositoryFactoryFor('FKEstUsu', usuariosRepositoryGetter,);
  }
}
