import {Entity, hasMany, model, property} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class VehMarca extends Entity {
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

  @hasMany(() => Vehiculos, {keyTo: 'CodMarca'})
  MarVeh: Vehiculos[];

  constructor(data?: Partial<VehMarca>) {
    super(data);
  }
}

export interface VehMarcaRelations {
  // describe navigational properties here
}

export type VehMarcaWithRelations = VehMarca & VehMarcaRelations;
