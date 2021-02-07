import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoUsu extends Entity {
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


  constructor(data?: Partial<EstadoUsu>) {
    super(data);
  }
}

export interface EstadoUsuRelations {
  // describe navigational properties here
}

export type EstadoUsuWithRelations = EstadoUsu & EstadoUsuRelations;
