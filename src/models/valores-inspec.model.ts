import {Entity, model, property} from '@loopback/repository';

@model()
export class ValoresInspec extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'date',
  })
  Fecha?: string;

  @property({
    type: 'number',
  })
  Valor?: number;

  @property({
    type: 'number',
  })
  IdTipo?: number;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  constructor(data?: Partial<ValoresInspec>) {
    super(data);
  }
}

export interface ValoresInspecRelations {
  // describe navigational properties here
}

export type ValoresInspecWithRelations = ValoresInspec & ValoresInspecRelations;
