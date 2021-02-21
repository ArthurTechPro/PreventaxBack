import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {NitInspec, Nits, NitsRelations, Usuarios} from '../models';
import {NitInspecRepository} from './nit-inspec.repository';
import {UsuariosRepository} from './usuarios.repository';

export class NitsRepository extends DefaultCrudRepository<
  Nits,
  typeof Nits.prototype.Nit,
  NitsRelations
  > {

  public readonly KFNitUsuario: HasManyRepositoryFactory<Usuarios, typeof Nits.prototype.Nit>;

  public readonly FKNitsInspec: HasManyRepositoryFactory<NitInspec, typeof Nits.prototype.Nit>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
    @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>,
  ) {
    super(Nits, dataSource);
    this.FKNitsInspec = this.createHasManyRepositoryFactoryFor('FKNitsInspec', nitInspecRepositoryGetter,);
    this.registerInclusionResolver('FKNitsInspec', this.FKNitsInspec.inclusionResolver);
    this.KFNitUsuario = this.createHasManyRepositoryFactoryFor('KFNitUsuario', usuariosRepositoryGetter,);
  }
}
