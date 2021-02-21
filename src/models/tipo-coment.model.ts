import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comentarios} from './comentarios.model';

@model()
export class TipoComent extends Entity {
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
    length: 50,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  Descrip: string;

  @hasMany(() => Comentarios, {keyTo: 'IdTipoComent'})
  FKTipComet: Comentarios[];

  constructor(data?: Partial<TipoComent>) {
    super(data);
  }
}

export interface TipoComentRelations {
  // describe navigational properties here
}

export type TipoComentWithRelations = TipoComent & TipoComentRelations;
