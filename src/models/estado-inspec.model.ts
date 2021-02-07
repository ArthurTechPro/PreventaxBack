import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoInspec extends Entity {
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


  constructor(data?: Partial<EstadoInspec>) {
    super(data);
  }
}

export interface EstadoInspecRelations {
  // describe navigational properties here
}

export type EstadoInspecWithRelations = EstadoInspec & EstadoInspecRelations;
