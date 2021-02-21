import {Entity, model, property} from '@loopback/repository';

@model()
export class FotoInspec extends Entity {
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
    length: 50,
    postgresql: {
      columnName: 'Url',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  Url?: string;

  @property({
    type: 'number',
  })
  IdTipoFoto?: number;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  @property({
    type: 'number',
  })
  IdPregunta?: number;

  constructor(data?: Partial<FotoInspec>) {
    super(data);
  }
}

export interface FotoInspecRelations {
  // describe navigational properties here
}

export type FotoInspecWithRelations = FotoInspec & FotoInspecRelations;
