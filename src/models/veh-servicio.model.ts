import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

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
  Descrip: string;

  @hasMany(() => Vehiculos, {keyTo: 'CodServicio'})
  SerVeh: Vehiculos[];

  constructor(data?: Partial<VehServicio>) {
    super(data);
  }
}

export interface VehServicioRelations {
  // describe navigational properties here
}

export type VehServicioWithRelations = VehServicio & VehServicioRelations;
