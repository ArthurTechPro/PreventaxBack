import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Nits, NitsRelations, Usuarios, NitInspec} from '../models';
import {GenCiudadesRepository} from './gen-ciudades.repository';
import {UsuariosRepository} from './usuarios.repository';
import {NitInspecRepository} from './nit-inspec.repository';

export class NitsRepository extends DefaultCrudRepository<
  Nits,
  typeof Nits.prototype.Nit,
  NitsRelations
  > {

  public readonly NitUsu: HasManyRepositoryFactory<Usuarios, typeof Nits.prototype.Nit>;

  public readonly NitInspec: HasManyRepositoryFactory<NitInspec, typeof Nits.prototype.Nit>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('GenCiudadesRepository') protected genCiudadesRepositoryGetter: Getter<GenCiudadesRepository>, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>,
  ) {
    super(Nits, dataSource);
    this.NitInspec = this.createHasManyRepositoryFactoryFor('NitInspec', nitInspecRepositoryGetter,);
    this.NitUsu = this.createHasManyRepositoryFactoryFor('NitUsu', usuariosRepositoryGetter,);
    this.registerInclusionResolver('NitUsu', this.NitUsu.inclusionResolver);

  }
}
