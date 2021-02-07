import {Entity, model, property} from '@loopback/repository';

@model()
export class Rolles extends Entity {
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


  constructor(data?: Partial<Rolles>) {
    super(data);
  }
}

export interface RollesRelations {
  // describe navigational properties here
}

export type RollesWithRelations = Rolles & RollesRelations;