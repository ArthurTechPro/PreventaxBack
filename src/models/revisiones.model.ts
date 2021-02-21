import {Entity, hasMany, model, property} from '@loopback/repository';
import {Comentarios} from './comentarios.model';
import {Preguntas} from './preguntas.model';

@model()
export class Revisiones extends Entity {
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
    length: 100,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  Descrip?: string;


  @property({
    type: 'Boolean',
    postgresql: {
      columnName: 'IdEstado',
      dataType: "Boolean",
    },
  })
  IdEstado?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'Aceptacion',
      dataType: "Decimal(4,4)"
    },
  })
  Aceptacion?: number;

  @hasMany(() => Comentarios, {keyTo: 'IdRevision'})
  FKRevisionComet: Comentarios[];

  @hasMany(() => Preguntas, {keyTo: 'IdRevision'})
  FKRevisPregunta: Preguntas[];

  @property({
    type: 'number',
  })
  IdProducto?: number;

  constructor(data?: Partial<Revisiones>) {
    super(data);
  }
}

export interface RevisionesRelations {
  // describe navigational properties here
}

export type RevisionesWithRelations = Revisiones & RevisionesRelations;
