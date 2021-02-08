import {Entity, model, property, hasMany} from '@loopback/repository';
import {Nits} from './nits.model';

@model()
export class TipoDoc extends Entity {
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

  @hasMany(() => Nits, {keyTo: 'IdTipo'})
  FKTipoNit: Nits[];

  constructor(data?: Partial<TipoDoc>) {
    super(data);
  }
}

export interface TipoDocRelations {
  // describe navigational properties here
}

export type TipoDocWithRelations = TipoDoc & TipoDocRelations;
