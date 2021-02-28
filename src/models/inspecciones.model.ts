import {Entity, hasMany, model, property} from '@loopback/repository';
import {FotoInspec} from './foto-inspec.model';
import {NitInspec} from './nit-inspec.model';
import {Observaciones} from './observaciones.model';
import {ValorInspec} from './valor-inspec.model';

@model()
export class Inspecciones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'Id',
      dataType: "Integer",
    },
  })
  Id?: number;

  @property({
    type: 'string',
    length: 20,
    postgresql: {
      columnName: 'NumIspec',
      dataType: "Varchar",
      datalength: 20,
    },
  })
  NumIspec?: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'FechaInspec',
      dataType: "date",
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: "N",
    },
  })
  FechaInspec: string;

  @property({
    type: 'number',
    length: 20,
    postgresql: {
      columnName: 'Kilometraje',
      dataType: "Varchar",
      datalength: 20,
    },
  })
  Kilometraje?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'Precio',
      dataType: "Decimal(16,2)"
    },
  })
  Precio?: number;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'VenceSOAT',
      dataType: "date",
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
    },
  })
  VenceSOAT?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'VenceRTM',
      dataType: "date",
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
    },
  })
  VenceRTM?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'JsonInspeccion',
      dataType: "Text",
    },
  })
  JsonInspeccion?: string;

  @property({
    type: 'number',
  })
  IdEstadoInspec?: number;

  @property({
    type: 'string',
  })
  IdPlaca?: string;

  @property({
    type: 'number',
  })
  IdProducto?: number;

  @hasMany(() => NitInspec, {keyTo: 'IdInspec'})
  FKInpecNits: NitInspec[];

  @property({
    type: 'number',
  })
  IdUsuario?: number;

  @hasMany(() => ValorInspec, {keyTo: 'IdInspec'})
  FKInspecValor: ValorInspec[];

  @hasMany(() => FotoInspec, {keyTo: 'IdInspec'})
  FKInspecFoto: FotoInspec[];

  @hasMany(() => Observaciones, {keyTo: 'IdInspec'})
  FKInspecObserva: Observaciones[];

  constructor(data?: Partial<Inspecciones>) {
    super(data);
  }
}

export interface InspeccionesRelations {
  // describe navigational properties here
}

export type InspeccionesWithRelations = Inspecciones & InspeccionesRelations;
