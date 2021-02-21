import {Entity, hasMany, model, property} from '@loopback/repository';
import {FotoInspec} from './foto-inspec.model';
import {Observaciones} from './observaciones.model';

@model()
export class Preguntas extends Entity {
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
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'Secuencia',
      dataType: "Integer",
    },
  })
  Secuencia: number;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'InputType',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  InputType?: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Pregunta',
      dataType: "Varchar",
      dataLength: 100,
    },
  })
  Pregunta: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      dataLength: 50,
    },
  })
  Descrip?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'Opciones',
      dataType: "Text",
    },
  })
  Opciones?: string;

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
      columnName: 'Pondera',
      dataType: "Decimal(4,4)"
    },
  })
  Pondera?: number;

  @property({
    type: 'number',
  })
  IdRevision?: number;

  @hasMany(() => Observaciones, {keyTo: 'IdPregunta'})
  FKPreguntaObserva: Observaciones[];

  @hasMany(() => FotoInspec, {keyTo: 'IdPregunta'})
  FKPreguntFoto: FotoInspec[];

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
