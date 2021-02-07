import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoFoto extends Entity {
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


  constructor(data?: Partial<TipoFoto>) {
    super(data);
  }
}

export interface TipoFotoRelations {
  // describe navigational properties here
}

export type TipoFotoWithRelations = TipoFoto & TipoFotoRelations;
