import {Entity, model, property} from '@loopback/repository';

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
  })
  Descrip?: string;

  @property({
    type: 'number',
  })
  IdComent?: number;

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
