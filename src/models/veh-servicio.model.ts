import {Entity, model, property} from '@loopback/repository';

@model()
export class VehServicio extends Entity {
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
  Servicio: string;


  constructor(data?: Partial<VehServicio>) {
    super(data);
  }
}

export interface VehServicioRelations {
  // describe navigational properties here
}

export type VehServicioWithRelations = VehServicio & VehServicioRelations;
