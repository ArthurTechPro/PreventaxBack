import {Entity, model, property, hasMany} from '@loopback/repository';
import {FotoInspec} from './foto-inspec.model';

@model()
export class TipoFoto extends Entity {
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

  @hasMany(() => FotoInspec, {keyTo: 'IdTipoFoto'})
  FKTipoFotoInspec: FotoInspec[];

  constructor(data?: Partial<TipoFoto>) {
    super(data);
  }
}

export interface TipoFotoRelations {
  // describe navigational properties here
}

export type TipoFotoWithRelations = TipoFoto & TipoFotoRelations;
