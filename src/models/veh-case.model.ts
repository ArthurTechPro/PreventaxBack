import {Entity, model, property} from '@loopback/repository';

@model()
export class VehCase extends Entity {
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
  Clase: string;


  constructor(data?: Partial<VehCase>) {
    super(data);
  }
}

export interface VehCaseRelations {
  // describe navigational properties here
}

export type VehCaseWithRelations = VehCase & VehCaseRelations;
