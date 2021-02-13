import {Entity, model, property} from '@loopback/repository';

@model()
export class Observaciones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
  })
  TipoObs?: number;

  @property({
    type: 'string',
  })
  Descrip?: string;

  @property({
    type: 'number',
  })
  IdPregunta?: number;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  @property({
    type: 'number',
  })
  IdRevision?: number;

  constructor(data?: Partial<Observaciones>) {
    super(data);
  }
}

export interface ObservacionesRelations {
  // describe navigational properties here
}

export type ObservacionesWithRelations = Observaciones & ObservacionesRelations;
