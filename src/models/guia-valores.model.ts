import {Entity, model, property} from '@loopback/repository';

@model()
export class GuiaValores extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  Codigo: number;

  @property({
    type: 'number',
  })
  Modelo?: number;

  @property({
    type: 'number',
  })
  Valor?: number;


  constructor(data?: Partial<GuiaValores>) {
    super(data);
  }
}

export interface GuiaValoresRelations {
  // describe navigational properties here
}

export type GuiaValoresWithRelations = GuiaValores & GuiaValoresRelations;
