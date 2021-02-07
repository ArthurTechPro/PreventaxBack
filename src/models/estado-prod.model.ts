import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoProd extends Entity {
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


  constructor(data?: Partial<EstadoProd>) {
    super(data);
  }
}

export interface EstadoProdRelations {
  // describe navigational properties here
}

export type EstadoProdWithRelations = EstadoProd & EstadoProdRelations;
