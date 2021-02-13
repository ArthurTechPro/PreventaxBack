import {Entity, model, property, hasMany} from '@loopback/repository';
import {Observaciones} from './observaciones.model';
import {FotoInspec} from './foto-inspec.model';

@model()
export class Preguntas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
    required: true,
  })
  Secuencia: number;

  @property({
    type: 'string',
  })
  InputType?: string;

  @property({
    type: 'string',
    required: true,
  })
  Pregunta: string;

  @property({
    type: 'string',
  })
  Descrip?: string;

  @property({
    type: 'string',
  })
  Opciones?: string;

  @property({
    type: 'number',
  })
  Pondera: number;

  @property({
    type: 'number',
  })
  IdRevision?: number;

  @hasMany(() => Observaciones, {keyTo: 'IdPregunta'})
  PreObs: Observaciones[];

  @hasMany(() => FotoInspec, {keyTo: 'IdPregunta'})
  PreFoto: FotoInspec[];

  constructor(data?: Partial<Preguntas>) {
    super(data);
  }
}

export interface PreguntasRelations {
  // describe navigational properties here
}

export type PreguntasWithRelations = Preguntas & PreguntasRelations;
