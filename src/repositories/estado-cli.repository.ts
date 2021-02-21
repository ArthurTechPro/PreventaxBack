import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoCli, EstadoCliRelations} from '../models';
import {ClientesRepository} from './clientes.repository';

export class EstadoCliRepository extends DefaultCrudRepository<
  EstadoCli,
  typeof EstadoCli.prototype.IdEstado,
  EstadoCliRelations
  > {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>,
  ) {
    super(EstadoCli, dataSource);
  }
}
