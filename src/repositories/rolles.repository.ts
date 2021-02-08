import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Rolles, RollesRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RollesRepository extends DefaultCrudRepository<
  Rolles,
  typeof Rolles.prototype.Id,
  RollesRelations
> {

  public readonly FKRollUsu: HasManyRepositoryFactory<Usuarios, typeof Rolles.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Rolles, dataSource);
    this.FKRollUsu = this.createHasManyRepositoryFactoryFor('FKRollUsu', usuariosRepositoryGetter,);
  }
}
