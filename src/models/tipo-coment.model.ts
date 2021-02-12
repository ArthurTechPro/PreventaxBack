import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoComent extends Entity {
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


  constructor(data?: Partial<TipoComent>) {
    super(data);
  }
}

export interface TipoComentRelations {
  // describe navigational properties here
}

export type TipoComentWithRelations = TipoComent & TipoComentRelations;
