import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Inspecciones} from './inspecciones.model';
import {Nits} from './nits.model';

@model()
export class Usuarios extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'IdUsuario',
      dataType: "Integer",
    },
  })
  IdUsuario?: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    postgresql: {
      columnName: 'Usuario',
      dataType: "Varchar",
      datalength: 20,
    },
  })
  Usuario: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Email',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      length: 100,
      columnName: 'Passsword',
      dataType: "Varchar",
      dayalength: 100,
    },
  })
  Passsword: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {
      columnName: 'IsAdmin',
      dataType: "Boolean",
    },
  })
  IsAdmin: boolean;

  @property({
    type: 'string',
    length: 100,
    postgresql: {
      columnName: 'Avatar',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Avatar?: string;

  @property({
    type: 'date',
    defaultFn: "now",
    postgresql: {
      columnName: 'FechaCrea',
    },
  })
  FechaCrea?: Date;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'IdEstadoUsu',
      dataType: "Integer",
    },
  })
  IdEstadoUsu?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'IdRoll',
      dataType: "Integer",
    },
  })
  IdRoll?: number;

  @belongsTo(() => Nits, {name: 'btUsuNit'})
  IdNit: number;

  @hasMany(() => Inspecciones, {keyTo: 'IdUsuario'})
  FKUsuInspec: Inspecciones[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
