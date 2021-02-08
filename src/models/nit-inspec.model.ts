import {Entity, model, property} from '@loopback/repository';

@model()
export class NitInspec extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
  })
  IdTipo?: number;

  @property({
    type: 'number',
  })
  Nit?: number;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  constructor(data?: Partial<NitInspec>) {
    super(data);
  }
}

export interface NitInspecRelations {
  // describe navigational properties here
}

export type NitInspecWithRelations = NitInspec & NitInspecRelations;
