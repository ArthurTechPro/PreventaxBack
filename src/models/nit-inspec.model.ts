import {Entity, model, property} from '@loopback/repository';

@model()
export class NitInspec extends Entity {
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
    type: 'number',
  })
  IdTipoNit?: number;

  @property({
    type: 'number',
  })
  IdNit?: number;

  @property({
    type: 'number',
  })
  IdInspeccion?: number;

  constructor(data?: Partial<NitInspec>) {
    super(data);
  }
}

export interface NitInspecRelations {
  // describe navigational properties here
}

export type NitInspecWithRelations = NitInspec & NitInspecRelations;
