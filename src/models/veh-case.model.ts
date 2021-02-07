import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

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

  @hasMany(() => Vehiculos, {keyTo: 'CodClase'})
  FKClaVeh: Vehiculos[];

  constructor(data?: Partial<VehCase>) {
    super(data);
  }
}

export interface VehCaseRelations {
  // describe navigational properties here
}

export type VehCaseWithRelations = VehCase & VehCaseRelations;
