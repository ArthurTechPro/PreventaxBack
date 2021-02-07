import {Entity, model, property} from '@loopback/repository';

@model()
export class GenCiuddes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  Codigo: number;

  @property({
    type: 'string',
    required: true,
  })
  Ciudad: string;


  constructor(data?: Partial<GenCiuddes>) {
    super(data);
  }
}

export interface GenCiuddesRelations {
  // describe navigational properties here
}

export type GenCiuddesWithRelations = GenCiuddes & GenCiuddesRelations;
