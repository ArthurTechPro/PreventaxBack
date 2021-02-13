import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Rolles, RollesRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RollesRepository extends DefaultCrudRepository<
  Rolles,
  typeof Rolles.prototype.Id,
  RollesRelations
> {

  public readonly RolUsu: HasManyRepositoryFactory<Usuarios, typeof Rolles.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Rolles, dataSource);
    this.RolUsu = this.createHasManyRepositoryFactoryFor('RolUsu', usuariosRepositoryGetter,);
  }
}
