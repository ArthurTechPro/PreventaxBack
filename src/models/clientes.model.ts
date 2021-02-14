import {Entity, model, property} from '@loopback/repository';

@model()
export class Clientes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Usuario: string;

  @property({
    type: 'number'
  })
  IdNits: number;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @property({
    type: 'string',
  })
  Avatar?: string;

  @property({
    type: 'date',
    defaultFn: "now",
  })
  FechaCrea?: string;

  @property({
    type: 'number',
  })
  IdEstado?: number;

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
