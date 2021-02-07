import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comentarios} from './comentarios.model';
import {Preguntas} from './preguntas.model';

@model()
export class Revisiones extends Entity {
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
    type: 'number',
  })
  Aceptacion?: number;

  @hasMany(() => Comentarios, {keyTo: 'IdRevision'})
  FKRevComent: Comentarios[];

  @hasMany(() => Preguntas, {keyTo: 'IdRevision'})
  KFRevPreg: Preguntas[];

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
