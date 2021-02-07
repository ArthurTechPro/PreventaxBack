import {Entity, model, property} from '@loopback/repository';

@model()
export class FotoInspec extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
  })
  Url?: string;

  @property({
    type: 'number',
  })
  IdTipo?: number;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  constructor(data?: Partial<FotoInspec>) {
    super(data);
  }
}

export interface FotoInspecRelations {
  // describe navigational properties here
}

export type FotoInspecWithRelations = FotoInspec & FotoInspecRelations;
