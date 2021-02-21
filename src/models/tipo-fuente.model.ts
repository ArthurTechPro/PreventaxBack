import {Entity, hasMany, model, property} from '@loopback/repository';
import {ValorInspec} from './valor-inspec.model';

@model()
export class TipoFuente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'Id',
      dataType: "Integer",
    },
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  Descrip: string;

  @hasMany(() => ValorInspec, {keyTo: 'IdTipoFuente'})
  FKTipoFuenteValor: ValorInspec[];

  constructor(data?: Partial<TipoFuente>) {
    super(data);
  }
}

export interface TipoFuenteRelations {
  // describe navigational properties here
}

export type TipoFuenteWithRelations = TipoFuente & TipoFuenteRelations;
