import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgSqlDataSource} from '../datasources';
import {Preguntas, PreguntasRelations} from '../models';

export class PreguntasRepository extends DefaultCrudRepository<
  Preguntas,
  typeof Preguntas.prototype.Id,
  PreguntasRelations
> {
  constructor(
    @inject('datasources.PgSql') dataSource: PgSqlDataSource,
  ) {
    super(Preguntas, dataSource);
  }
}
