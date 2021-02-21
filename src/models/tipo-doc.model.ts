import {Entity, hasMany, model, property} from '@loopback/repository';
import {Nits} from './nits.model';

@model()
export class TipoDoc extends Entity {
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
    length: 100,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Descrip: string;

  @hasMany(() => Nits, {keyTo: 'IdTipoDoc'})
  FKTipoDocNIt: Nits[];

  constructor(data?: Partial<TipoDoc>) {
    super(data);
  }
}

export interface TipoDocRelations {
  // describe navigational properties here
}

export type TipoDocWithRelations = TipoDoc & TipoDocRelations;
