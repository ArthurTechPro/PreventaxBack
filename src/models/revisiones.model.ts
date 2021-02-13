import {Entity, hasMany, model, property} from '@loopback/repository';
import {Preguntas} from './preguntas.model';
import {Observaciones} from './observaciones.model';

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

  @property({
    type: 'number',
  })
  IdProduc?: number;

  @hasMany(() => Preguntas, {keyTo: 'IdRevision'})
  RevPre: Preguntas[];

  @property({
    type: 'number',
  })
  IdComent?: number;

  @hasMany(() => Observaciones, {keyTo: 'IdRevision'})
  RevisionObs: Observaciones[];

  constructor(data?: Partial<Revisiones>) {
    super(data);
  }
}

export interface RevisionesRelations {
  // describe navigational properties here
}

export type RevisionesWithRelations = Revisiones & RevisionesRelations;
