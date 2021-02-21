import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revisiones} from './revisiones.model';
import {Inspecciones} from './inspecciones.model';

@model()
export class Productos extends Entity {
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
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Titulo',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  Titulo: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'Descrip',
      dataType: "Text",
    },
  })
  Descrip?: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'FechaIni',
      dataType: "date",
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: "N",
    },
  })
  FechaIni: Date;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {
      columnName: 'PublicaWeb',
      dataType: "Boolean",
    },
  })
  PublicaWeb: boolean;


  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'Precio',
      dataType: "Decimal(16,2)"
    },
  })
  Precio: number;

  @hasMany(() => Revisiones, {keyTo: 'IdProducto'})
  FKProductoRevision: Revisiones[];

  @hasMany(() => Inspecciones, {keyTo: 'IdProducto'})
  FKProducInspec: Inspecciones[];

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
