import {Entity, hasMany, model, property} from '@loopback/repository';
import {GenCiudades} from './gen-ciudades.model';

@model()
export class GenDeptos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    postgresql: {
      columnName: 'IdDepto',
      dataType: "Integer",
    },
  })
  IdDepto: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Descrip: string;

  @hasMany(() => GenCiudades, {keyTo: 'IdDepto'})
  FKDeptosCiudad: GenCiudades[];

  constructor(data?: Partial<GenDeptos>) {
    super(data);
  }
}

export interface GenDeptosRelations {
  // describe navigational properties here
}

export type GenDeptosWithRelations = GenDeptos & GenDeptosRelations;
