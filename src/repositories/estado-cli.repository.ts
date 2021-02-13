import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {EstadoCli, EstadoCliRelations, Clientes} from '../models';
import {ClientesRepository} from './clientes.repository';

export class EstadoCliRepository extends DefaultCrudRepository<
  EstadoCli,
  typeof EstadoCli.prototype.Id,
  EstadoCliRelations
> {

  public readonly EstCli: HasManyRepositoryFactory<Clientes, typeof EstadoCli.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>,
  ) {
    super(EstadoCli, dataSource);
    this.EstCli = this.createHasManyRepositoryFactoryFor('EstCli', clientesRepositoryGetter,);
  }
}
