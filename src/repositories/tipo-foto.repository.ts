import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoFoto, TipoFotoRelations, FotoInspec} from '../models';
import {FotoInspecRepository} from './foto-inspec.repository';

export class TipoFotoRepository extends DefaultCrudRepository<
  TipoFoto,
  typeof TipoFoto.prototype.Id,
  TipoFotoRelations
> {

  public readonly TipoFotoI: HasManyRepositoryFactory<FotoInspec, typeof TipoFoto.prototype.Id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('FotoInspecRepository') protected fotoInspecRepositoryGetter: Getter<FotoInspecRepository>,
  ) {
    super(TipoFoto, dataSource);
    this.TipoFotoI = this.createHasManyRepositoryFactoryFor('TipoFotoI', fotoInspecRepositoryGetter,);
  }
}
