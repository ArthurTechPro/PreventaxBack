import {Entity, hasMany, model, property} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class EstadoUsu extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'IdEstadoUsu',
      dataType: "Integer",
    },
  })
  IdEstado?: number;

  @property({
    type: 'string',
    required: true,

    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      length: 50,
    },
  })
  Descrip: string;

  @hasMany(() => Usuarios, {keyTo: 'IdEstadoUsu'})
  FKEstadoUsu: Usuarios[];

  constructor(data?: Partial<EstadoUsu>) {
    super(data);
  }
}

export interface EstadoUsuRelations {
  // describe navigational properties here
}

export type EstadoUsuWithRelations = EstadoUsu & EstadoUsuRelations;
