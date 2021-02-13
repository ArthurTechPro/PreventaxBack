import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class EstadoUsu extends Entity {
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

  @hasMany(() => Usuarios, {keyTo: 'IdEstado'})
  EstUsu: Usuarios[];

  constructor(data?: Partial<EstadoUsu>) {
    super(data);
  }
}

export interface EstadoUsuRelations {
  // describe navigational properties here
}

export type EstadoUsuWithRelations = EstadoUsu & EstadoUsuRelations;
