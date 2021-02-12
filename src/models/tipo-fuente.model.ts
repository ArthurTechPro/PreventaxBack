import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoFuente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Descrip: string;


  constructor(data?: Partial<TipoFuente>) {
    super(data);
  }
}

export interface TipoFuenteRelations {
  // describe navigational properties here
}

export type TipoFuenteWithRelations = TipoFuente & TipoFuenteRelations;
