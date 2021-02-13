import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inspecciones} from './inspecciones.model';
import {Revisiones} from './revisiones.model';

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
    type: 'date',
    required: true,
  })
  FechaIni: string;

  @property({
    type: 'boolean',
    required: true,
  })
  PublicaWeb: boolean;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'number',
  })
  IdEstado?: number;

  @hasMany(() => Inspecciones, {keyTo: 'IdProduc'})
  ProdInspec: Inspecciones[];

  @hasMany(() => Revisiones, {keyTo: 'IdProduc'})
  ProdRev: Revisiones[];

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
