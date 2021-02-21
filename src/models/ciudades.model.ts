import {Entity, hasMany, model, property} from '@loopback/repository';
import {Nits} from './nits.model';

@model()
export class Ciudades extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    postgresql: {
      columnName: 'IdCiudad',
      dataType: "Integer",
    },
  })
  IdCiudad: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      length: 100,
    },
  })
  Descrip: string;

  @property({
    type: 'number',
  })
  IdDepto?: number;

  @hasMany(() => Nits, {keyTo: 'IdCiudad'})
  FKCiuNit: Nits[];

  constructor(data?: Partial<Ciudades>) {
    super(data);
  }
}

export interface CiudadesRelations {
  // describe navigational properties here
}

export type CiudadesWithRelations = Ciudades & CiudadesRelations;
