import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Fasecolda, FasecoldaRelations} from '../models';

export class FasecoldaRepository extends DefaultCrudRepository<
  Fasecolda,
  typeof Fasecolda.prototype.Codigo,
  FasecoldaRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Fasecolda, dataSource);
  }
}
