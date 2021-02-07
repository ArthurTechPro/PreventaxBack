import {Entity, model, property, hasMany} from '@loopback/repository';
import {ValorInspec} from './valor-inspec.model';

@model()
export class TipoFuente extends Entity {
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

  @hasMany(() => ValorInspec, {keyTo: 'IdTipoFuente'})
  KFTipFuente: ValorInspec[];

  constructor(data?: Partial<TipoFuente>) {
    super(data);
  }
}

export interface TipoFuenteRelations {
  // describe navigational properties here
}

export type TipoFuenteWithRelations = TipoFuente & TipoFuenteRelations;
