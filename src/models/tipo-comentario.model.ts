import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoComentario extends Entity {
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


  constructor(data?: Partial<TipoComentario>) {
    super(data);
  }
}

export interface TipoComentarioRelations {
  // describe navigational properties here
}

export type TipoComentarioWithRelations = TipoComentario & TipoComentarioRelations;