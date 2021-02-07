import {Entity, model, property} from '@loopback/repository';

@model()
export class TnitInspec extends Entity {
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


  constructor(data?: Partial<TnitInspec>) {
    super(data);
  }
}

export interface TnitInspecRelations {
  // describe navigational properties here
}

export type TnitInspecWithRelations = TnitInspec & TnitInspecRelations;
