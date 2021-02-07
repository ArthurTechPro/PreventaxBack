import {Entity, model, property} from '@loopback/repository';

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
  ImputType?: string;

  @property({
    type: 'string',
  })
  Pregunta?: string;

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
  Ponderado?: number;


  constructor(data?: Partial<Preguntas>) {
    super(data);
  }
}

export interface PreguntasRelations {
  // describe navigational properties here
}

export type PreguntasWithRelations = Preguntas & PreguntasRelations;
