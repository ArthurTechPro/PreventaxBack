import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comentarios} from './comentarios.model';

@model()
export class TipoComentario extends Entity {
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

  @hasMany(() => Comentarios, {keyTo: 'IdComent'})
  FKTipComent: Comentarios[];

  constructor(data?: Partial<TipoComentario>) {
    super(data);
  }
}

export interface TipoComentarioRelations {
  // describe navigational properties here
}

export type TipoComentarioWithRelations = TipoComentario & TipoComentarioRelations;
