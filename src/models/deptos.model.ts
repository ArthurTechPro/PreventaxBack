import {Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudades} from './ciudades.model';

@model()
export class Deptos extends Entity {
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

  @hasMany(() => Ciudades, {keyTo: 'IdDepto'})
  FKDeptosCiudad: Ciudades[];

  constructor(data?: Partial<Deptos>) {
    super(data);
  }
}

export interface DeptosRelations {
  // describe navigational properties here
}

export type DeptosWithRelations = Deptos & DeptosRelations;
