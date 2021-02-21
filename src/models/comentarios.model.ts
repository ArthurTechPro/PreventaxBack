import {Entity, model, property} from '@loopback/repository';

@model()
export class Comentarios extends Entity {
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
    length: 255,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 255,
    },
  })
  Descrip: string;

  @property({
    type: 'number',
  })
  IdTipoComent?: number;

  @property({
    type: 'number',
  })
  IdRevision?: number;

  constructor(data?: Partial<Comentarios>) {
    super(data);
  }
}

export interface ComentariosRelations {
  // describe navigational properties here
}

export type ComentariosWithRelations = Comentarios & ComentariosRelations;
