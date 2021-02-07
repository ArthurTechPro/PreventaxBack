import {Entity, model, property} from '@loopback/repository';

@model()
export class Productos extends Entity {
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
  Titulo: string;

  @property({
    type: 'string',
  })
  Descrip?: string;

  @property({
    type: 'date',
  })
  FechaIni?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Publica: boolean;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;


  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
