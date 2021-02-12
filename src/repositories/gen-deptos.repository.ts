import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {GenDeptos, GenDeptosRelations} from '../models';

export class GenDeptosRepository extends DefaultCrudRepository<
  GenDeptos,
  typeof GenDeptos.prototype.Codigo,
  GenDeptosRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(GenDeptos, dataSource);
  }
}
