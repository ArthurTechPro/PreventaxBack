import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Rolles, RollesRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RollesRepository extends DefaultCrudRepository<
  Rolles,
  typeof Rolles.prototype.Id,
  RollesRelations
  > {

  public readonly FKRollUsu: HasManyRepositoryFactory<Usuarios, typeof Rolles.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Rolles, dataSource);
    this.FKRollUsu = this.createHasManyRepositoryFactoryFor('FKRollUsu', usuariosRepositoryGetter,);
  }
}
