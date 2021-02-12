import {Entity, model, property} from '@loopback/repository';

@model()
export class VehClase extends Entity {
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


  constructor(data?: Partial<VehClase>) {
    super(data);
  }
}

export interface VehClaseRelations {
  // describe navigational properties here
}

export type VehClaseWithRelations = VehClase & VehClaseRelations;
