import {Entity, model, property, hasMany} from '@loopback/repository';
import {NitInspec} from './nit-inspec.model';

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

  @hasMany(() => NitInspec, {keyTo: 'IdTipo'})
  FKTipNit: NitInspec[];

  constructor(data?: Partial<TnitInspec>) {
    super(data);
  }
}

export interface TnitInspecRelations {
  // describe navigational properties here
}

export type TnitInspecWithRelations = TnitInspec & TnitInspecRelations;
