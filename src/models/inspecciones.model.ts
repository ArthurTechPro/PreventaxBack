import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<Inspecciones>) {
    super(data);
  }
}

export interface InspeccionesRelations {
  // describe navigational properties here
}

export type InspeccionesWithRelations = Inspecciones & InspeccionesRelations;
