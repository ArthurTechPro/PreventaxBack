import {Entity, hasMany, model, property} from '@loopback/repository';
import {GenCiudades} from './gen-ciudades.model';

@model()
export class GenDeptos extends Entity {
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

  @hasMany(() => GenCiudades, {keyTo: 'CodDepto'})
  DepCiu: GenCiudades[];

  constructor(data?: Partial<GenDeptos>) {
    super(data);
  }
}

export interface GenDeptosRelations {
  // describe navigational properties here
}

export type GenDeptosWithRelations = GenDeptos & GenDeptosRelations;
