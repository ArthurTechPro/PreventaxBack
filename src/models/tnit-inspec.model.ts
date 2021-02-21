import {Entity, hasMany, model, property} from '@loopback/repository';
import {NitInspec} from './nit-inspec.model';

@model()
export class TnitInspec extends Entity {
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

  @hasMany(() => NitInspec, {keyTo: 'IdTipoNit'})
  FKTipoNit: NitInspec[];

  constructor(data?: Partial<TnitInspec>) {
    super(data);
  }
}

export interface TnitInspecRelations {
  // describe navigational properties here
}

export type TnitInspecWithRelations = TnitInspec & TnitInspecRelations;
