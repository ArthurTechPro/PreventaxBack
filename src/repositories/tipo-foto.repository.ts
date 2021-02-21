import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {FotoInspec, TipoFoto, TipoFotoRelations} from '../models';
import {FotoInspecRepository} from './foto-inspec.repository';

export class TipoFotoRepository extends DefaultCrudRepository<
  TipoFoto,
  typeof TipoFoto.prototype.Id,
  TipoFotoRelations
  > {

  public readonly FKTipoFotoInspec: HasManyRepositoryFactory<FotoInspec, typeof TipoFoto.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('FotoInspecRepository') protected fotoInspecRepositoryGetter: Getter<FotoInspecRepository>,
  ) {
    super(TipoFoto, dataSource);
    this.FKTipoFotoInspec = this.createHasManyRepositoryFactoryFor('FKTipoFotoInspec', fotoInspecRepositoryGetter,);
  }
}
