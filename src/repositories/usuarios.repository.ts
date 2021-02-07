import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Usuarios, UsuariosRelations} from '../models';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.Id,
  UsuariosRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Usuarios, dataSource);
  }
}
