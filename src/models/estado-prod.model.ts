import {Entity, model, property, hasMany} from '@loopback/repository';
import {Productos} from './productos.model';

@model()
export class EstadoProd extends Entity {
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
  Descrip: string;

  @hasMany(() => Productos, {keyTo: 'IdEstado'})
  EstProd: Productos[];

  constructor(data?: Partial<EstadoProd>) {
    super(data);
  }
}

export interface EstadoProdRelations {
  // describe navigational properties here
}

export type EstadoProdWithRelations = EstadoProd & EstadoProdRelations;
