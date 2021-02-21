import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class Marcas extends Entity {
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
  Id: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Marca',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Marca: string;

  @hasMany(() => Vehiculos, {keyTo: 'IdMarca'})
  FKMarcaVeh: Vehiculos[];

  constructor(data?: Partial<Marcas>) {
    super(data);
  }
}

export interface MarcasRelations {
  // describe navigational properties here
}

export type MarcsWithRelations = Marcas & MarcasRelations;
