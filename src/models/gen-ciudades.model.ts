import {Entity, hasMany, model, property} from '@loopback/repository';
import {Nits} from './nits.model';

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

  @property({
    type: 'number',
  })
  CodDepto?: number;

  @hasMany(() => Nits, {keyTo: 'CodCiudad'})
  CiuNit: Nits[];

  constructor(data?: Partial<GenCiudades>) {
    super(data);
  }
}

export interface GenCiudadesRelations {
  // describe navigational properties here
}

export type GenCiudadesWithRelations = GenCiudades & GenCiudadesRelations;
