import {Entity, model, property} from '@loopback/repository';

@model()
export class Observaciones extends Entity {
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
    type: 'number',
    postgresql: {
      columnName: 'TipoObs',
      dataType: "Integer",
    },
  })
  TipoObs?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 255,
    },
  })
  Descrip?: string;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  @property({
    type: 'number',
  })
  IdPregunta?: number;

  constructor(data?: Partial<Observaciones>) {
    super(data);
  }
}

export interface ObservacionesRelations {
  // describe navigational properties here
}

export type ObservacionesWithRelations = Observaciones & ObservacionesRelations;
