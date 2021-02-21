import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inspecciones} from './inspecciones.model';

@model()
export class Vehiculos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    length: 8,
    postgresql: {
      columnName: 'Placa',
      dataType: "Char",
      datalength: 8,
    },
  })
  Placa: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'VehTipo',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  VehTipo?: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'Modelo',
      dataType: "Integer",
    },
  })
  Modelo: number;

  @property({
    type: 'string',
    length: 15,
    postgresql: {
      columnName: 'Cilindraje',
      dataType: "Varchar",
      datalength: 15,
    },
  })
  Cilindraje?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Motor',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Motor?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Chasis',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Chasis?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Serial',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Serial?: string;

  @property({
    type: 'number',
    length: 20,
    postgresql: {
      columnName: 'CapCagra',
      dataType: "Varchar",
      datalength: 20,
    },
  })
  CapCagra?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'CapPassajeros',
      dataType: "Integer",
    },
  })
  CapPassajeros?: number;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'Color',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  Color?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'TipoPintura',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  TipoPintura?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'Combustible',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  Combustible?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'TipoCaja',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  TipoCaja?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'VIN',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  VIN?: string;

  @property({
    type: 'number',
  })
  IdMarca?: number;

  @property({
    type: 'number',
  })
  IdClase?: number;

  @property({
    type: 'number',
  })
  IdServicio?: number;

  @hasMany(() => Inspecciones, {keyTo: 'IdPlaca'})
  FKVehiculoInspec: Inspecciones[];

  constructor(data?: Partial<Vehiculos>) {
    super(data);
  }
}

export interface VehiculosRelations {
  // describe navigational properties here
}

export type VehiculosWithRelations = Vehiculos & VehiculosRelations;
