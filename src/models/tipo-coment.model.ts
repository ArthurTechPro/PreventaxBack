import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comentarios} from './comentarios.model';

@model()
export class TipoComent extends Entity {
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

  @hasMany(() => Comentarios, {keyTo: 'IdTipo'})
  TipComent: Comentarios[];

  constructor(data?: Partial<TipoComent>) {
    super(data);
  }
}

export interface TipoComentRelations {
  // describe navigational properties here
}

export type TipoComentWithRelations = TipoComent & TipoComentRelations;
