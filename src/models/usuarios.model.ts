import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuarios extends Entity {
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
  Usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Passsword: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsAdmin: boolean;

  @property({
    type: 'string',
  })
  Avatar?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaCrea: string;


  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
