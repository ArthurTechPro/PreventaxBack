import {Entity, model, property, hasMany} from '@loopback/repository';
import {NitInspec} from './nit-inspec.model';
import {ValorInspec} from './valor-inspec.model';
import {FotoInspec} from './foto-inspec.model';
import {Observacion} from './observacion.model';

@model()
export class Inspecciones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
    required: true,
  })
  NumInspec: number;

  @property({
    type: 'date',
  })
  FechaInspec?: string;

  @property({
    type: 'number',
  })
  Kilometraje?: number;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'date',
    required: true,
  })
  VenceSOAT: string;

  @property({
    type: 'date',
    required: true,
  })
  VenceRTM: string;

  @property({
    type: 'string'
  })
  JSON_Revision: string;

  @property({
    type: 'number',
  })
  IdEstado?: number;

  @hasMany(() => NitInspec, {keyTo: 'IdInspec'})
  FKIspNit: NitInspec[];

  @property({
    type: 'number',
  })
  IdUsuario?: number;

  @property({
    type: 'number',
  })
  IdProduto?: number;

  @property({
    type: 'string',
  })
  IdPlaca?: string;

  @hasMany(() => ValorInspec, {keyTo: 'IdInspec'})
  FKInsVal: ValorInspec[];

  @hasMany(() => FotoInspec, {keyTo: 'IdInspec'})
  FKInsFoto: FotoInspec[];

  @hasMany(() => Observacion, {keyTo: 'IdInspec'})
  FKInsObs: Observacion[];

  constructor(data?: Partial<Inspecciones>) {
    super(data);
  }
}

export interface InspeccionesRelations {
  // describe navigational properties here
}

export type InspeccionesWithRelations = Inspecciones & InspeccionesRelations;
