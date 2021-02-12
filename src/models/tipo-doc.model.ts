import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoDoc extends Entity {
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


  constructor(data?: Partial<TipoDoc>) {
    super(data);
  }
}

export interface TipoDocRelations {
  // describe navigational properties here
}

export type TipoDocWithRelations = TipoDoc & TipoDocRelations;
