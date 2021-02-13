import {Entity, hasMany, model, property} from '@loopback/repository';
import {FotoInspec} from './foto-inspec.model';
import {NitInspec} from './nit-inspec.model';
import {Observaciones} from './observaciones.model';
import {ValoresInspec} from './valores-inspec.model';

@model()
export class Inspecciones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
  })
  NumIspec?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaInspec: string;

  @property({
    type: 'number',
  })
  Kilometraje?: number;

  @property({
    type: 'number',
  })
  Precio?: number;

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
    type: 'string',
  })
  JSONRevision?: string;

  @property({
    type: 'number',
  })
  IdEstado?: number;

  @hasMany(() => NitInspec, {keyTo: 'IdInspec'})
  InspecNit: NitInspec[];

  @property({
    type: 'number',
  })
  IdUsuario?: number;

  @property({
    type: 'number',
  })
  IdProduc?: number;

  @property({
    type: 'string',
  })
  IdPlaca?: string;

  @hasMany(() => ValoresInspec, {keyTo: 'IdInspec'})
  InspecVal: ValoresInspec[];

  @hasMany(() => FotoInspec, {keyTo: 'IdInspec'})
  InspecFoto: FotoInspec[];

  @hasMany(() => Observaciones, {keyTo: 'IdInspec'})
  InspecObs: Observaciones[];

  constructor(data?: Partial<Inspecciones>) {
    super(data);
  }
}

export interface InspeccionesRelations {
  // describe navigational properties here
}

export type InspeccionesWithRelations = Inspecciones & InspeccionesRelations;
