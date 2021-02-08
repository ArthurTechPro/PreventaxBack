import {Entity, model, property, hasMany} from '@loopback/repository';
import {GenCiuddes} from './gen-ciuddes.model';

@model()
export class GenDepto extends Entity {
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
  Depto: string;

  @hasMany(() => GenCiuddes, {keyTo: 'IdDepto'})
  FKDepCiu: GenCiuddes[];

  constructor(data?: Partial<GenDepto>) {
    super(data);
  }
}

export interface GenDeptoRelations {
  // describe navigational properties here
}

export type GenDeptoWithRelations = GenDepto & GenDeptoRelations;
