import {Entity, hasMany, model, property} from '@loopback/repository';
import {Nits} from './nits.model';

@model()
export class GenCiudades extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  Descrip: string;

  @property({
    type: 'string',
  })
  CodDepto?: string;

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
