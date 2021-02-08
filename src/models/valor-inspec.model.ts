import {Entity, model, property} from '@loopback/repository';

@model()
export class ValorInspec extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
  })
  Valor?: number;

  @property({
    type: 'number',
  })
  IdTipoFuente?: number;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  constructor(data?: Partial<ValorInspec>) {
    super(data);
  }
}

export interface ValorInspecRelations {
  // describe navigational properties here
}

export type ValorInspecWithRelations = ValorInspec & ValorInspecRelations;
