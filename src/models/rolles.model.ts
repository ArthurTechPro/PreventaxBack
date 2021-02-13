import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

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

  @hasMany(() => Usuarios, {keyTo: 'IdRoll'})
  RolUsu: Usuarios[];

  constructor(data?: Partial<Rolles>) {
    super(data);
  }
}

export interface RollesRelations {
  // describe navigational properties here
}

export type RollesWithRelations = Rolles & RollesRelations;
