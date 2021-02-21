import {Entity, hasMany, model, property} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {NitInspec} from './nit-inspec.model';

@model()
export class Nits extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    postgresql: {
      columnName: 'Nit',
      dataType: "Integer",
    },
  })
  Nit?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'DChequeo',
      dataType: "Integer",
    },
  })
  DChequeo?: number;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Nombres',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  Nombres?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Apellidos',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  Apellidos?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Direccion',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  Direccion?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Email',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  Email?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'TelCel',
      dataType: "Varchar",
      dataLength: 50,
    },
  })
  TelCel?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'TelFijo',
      dataType: "Varchar",
      dataLength: 50,
    },
  })
  TelFijo?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'NomComercial',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  NomComercial?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'Sexo',
      dataType: "Char",
    },
  })
  Sexo?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'FechaNace',
      dataType: "date",
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
    },
  })
  FechaNace?: Date;

  @property({
    type: 'date',
    defaultFn: "now",
    postgresql: {
      columnName: 'FechaCrea',
    },
  })
  FechaCrea?: Date;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'IdTipoDoc',
      dataType: "Integer",
    },
  })
  IdTipoDoc?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'IdCiudad',
      dataType: "Integer",
    },
  })
  IdCiudad?: number;

  @hasMany(() => Usuarios, {keyTo: 'IdNit'})
  KFNitUsuario: Usuarios[];

  @hasMany(() => NitInspec, {keyTo: 'IdNit'})
  FKNitsInspec: NitInspec[];

  constructor(data?: Partial<Nits>) {
    super(data);
  }
}

export interface NitsRelations {
  // describe navigational properties here
}

export type NitsWithRelations = Nits & NitsRelations;
