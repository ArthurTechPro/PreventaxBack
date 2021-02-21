import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class Clases extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    postgresql: {
      columnName: 'Id',
      dataType: "Integer",
    },
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Clase',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Clase: string;

  @hasMany(() => Vehiculos, {keyTo: 'IdClase'})
  FKClaseVeh: Vehiculos[];

  constructor(data?: Partial<Clases>) {
    super(data);
  }
}

export interface ClasesRelations {
  // describe navigational properties here
}

export type ClasesWithRelations = Clases & ClasesRelations;
