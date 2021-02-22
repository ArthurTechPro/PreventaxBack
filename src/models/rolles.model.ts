import {Entity, hasMany, model, property} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class Rolles extends Entity {
  @property({
    type: 'number',
    id: true,
    postgresql: {
      columnName: 'Id',
      dataType: "decimal",
    },
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Descrip: string;

  @hasMany(() => Usuarios, {keyTo: 'IdRoll'})
  FKRollUsu: Usuarios[];

  constructor(data?: Partial<Rolles>) {
    super(data);
  }
}

export interface RollesRelations {
  // describe navigational properties here
}

export type RollesWithRelations = Rolles & RollesRelations;
