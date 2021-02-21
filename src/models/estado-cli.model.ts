import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoCli extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'IdEstado',
      dataType: "Integer",
    },
  })
  IdEstado?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
    },
  })
  Descrip: string;


  constructor(data?: Partial<EstadoCli>) {
    super(data);
  }
}

export interface EstadoCliRelations {
  // describe navigational properties here
}

export type EstadoCliWithRelations = EstadoCli & EstadoCliRelations;
