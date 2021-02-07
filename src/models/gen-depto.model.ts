import {Entity, model, property} from '@loopback/repository';

@model()
export class GenDepto extends Entity {
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
  Depto: string;


  constructor(data?: Partial<GenDepto>) {
    super(data);
  }
}

export interface GenDeptoRelations {
  // describe navigational properties here
}

export type GenDeptoWithRelations = GenDepto & GenDeptoRelations;
