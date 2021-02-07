import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Nits, NitsRelations, NitInspec, Usuarios} from '../models';
import {NitInspecRepository} from './nit-inspec.repository';
import {UsuariosRepository} from './usuarios.repository';

export class NitsRepository extends DefaultCrudRepository<
  Nits,
  typeof Nits.prototype.Nit,
  NitsRelations
> {

  public readonly FKNitIsnp: HasManyRepositoryFactory<NitInspec, typeof Nits.prototype.Nit>;

  public readonly FKNitUsu: HasManyRepositoryFactory<Usuarios, typeof Nits.prototype.Nit>;

  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource, @repository.getter('NitInspecRepository') protected nitInspecRepositoryGetter: Getter<NitInspecRepository>, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Nits, dataSource);
    this.FKNitUsu = this.createHasManyRepositoryFactoryFor('FKNitUsu', usuariosRepositoryGetter,);
    this.FKNitIsnp = this.createHasManyRepositoryFactoryFor('FKNitIsnp', nitInspecRepositoryGetter,);
  }
}
