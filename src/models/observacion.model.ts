import {Entity, model, property} from '@loopback/repository';

@model()
export class Observacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'number',
  })
  TipoObs?: number;

  @property({
    type: 'string',
  })
  Descrip?: string;


  constructor(data?: Partial<Observacion>) {
    super(data);
  }
}

export interface ObservacionRelations {
  // describe navigational properties here
}

export type ObservacionWithRelations = Observacion & ObservacionRelations;