import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revisiones} from './revisiones.model';
import {Inspecciones} from './inspecciones.model';

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

  @property({
    type: 'number',
  })
  IdEstado?: number;

  @hasMany(() => Revisiones, {keyTo: 'IdProducto'})
  FKProRev: Revisiones[];

  @hasMany(() => Inspecciones, {keyTo: 'IdProduto'})
  FKProdInspec: Inspecciones[];

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
