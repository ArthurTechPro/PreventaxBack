import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Nits, NitsRelations, Usuarios, NitInspec} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {NitInspecRepository} from './nit-inspec.repository';

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
