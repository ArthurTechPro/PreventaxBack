import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Clientes, EstadoCli, EstadoCliRelations} from '../models';
import {ClientesRepository} from './clientes.repository';

export class EstadoCliRepository extends DefaultCrudRepository<
  EstadoCli,
  typeof EstadoCli.prototype.Id,
  EstadoCliRelations
  > {

  public readonly FKEstCli: HasManyRepositoryFactory<Clientes, typeof EstadoCli.prototype.Id>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>,
  ) {
    super(EstadoCli, dataSource);
    this.FKEstCli = this.createHasManyRepositoryFactoryFor('FKEstCli', clientesRepositoryGetter,);
  }
}
