import {Entity, hasMany, model, property} from '@loopback/repository';
import {Revisiones} from './revisiones.model';

@model()
export class Comentarios extends Entity {
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

  @property({
    type: 'number',
  })
  IdTipo?: number;

  @hasMany(() => Revisiones, {keyTo: 'IdComent'})
  ComRev: Revisiones[];

  @property({
    type: 'number',
  })
  IdRevicion?: number;

  constructor(data?: Partial<Comentarios>) {
    super(data);
  }
}

export interface ComentariosRelations {
  // describe navigational properties here
}

export type ComentariosWithRelations = Comentarios & ComentariosRelations;
