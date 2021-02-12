import {Entity, model, property} from '@loopback/repository';

@model()
export class GenCiudades extends Entity {
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
  Descrip: string;


  constructor(data?: Partial<GenCiudades>) {
    super(data);
  }
}

export interface GenCiudadesRelations {
  // describe navigational properties here
}

export type GenCiudadesWithRelations = GenCiudades & GenCiudadesRelations;
