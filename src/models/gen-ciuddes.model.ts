import {Entity, model, property, hasMany} from '@loopback/repository';
import {Nits} from './nits.model';

@model()
export class GenCiuddes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  Codigo: number;

  @property({
    type: 'string',
    required: true,
  })
  Ciudad: string;

  @property({
    type: 'number',
  })
  IdDepto?: number;

  @hasMany(() => Nits, {keyTo: 'IdCiudad'})
  FKCiuNit: Nits[];

  constructor(data?: Partial<GenCiuddes>) {
    super(data);
  }
}

export interface GenCiuddesRelations {
  // describe navigational properties here
}

export type GenCiuddesWithRelations = GenCiuddes & GenCiuddesRelations;
