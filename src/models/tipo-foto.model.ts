import {Entity, model, property, hasMany} from '@loopback/repository';
import {FotoInspec} from './foto-inspec.model';

@model()
export class TipoFoto extends Entity {
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

  @hasMany(() => FotoInspec, {keyTo: 'IdTipo'})
  TipoFotoI: FotoInspec[];

  constructor(data?: Partial<TipoFoto>) {
    super(data);
  }
}

export interface TipoFotoRelations {
  // describe navigational properties here
}

export type TipoFotoWithRelations = TipoFoto & TipoFotoRelations;
