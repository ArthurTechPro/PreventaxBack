import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Clientes, ClientesRelations} from '../models';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.Id,
  ClientesRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Clientes, dataSource);
  }
}
