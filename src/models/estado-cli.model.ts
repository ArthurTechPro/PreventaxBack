import {Entity, model, property, hasMany} from '@loopback/repository';
import {Clientes} from './clientes.model';

@model()
export class EstadoCli extends Entity {
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

  @hasMany(() => Clientes, {keyTo: 'IdEstado'})
  EstCli: Clientes[];

  constructor(data?: Partial<EstadoCli>) {
    super(data);
  }
}

export interface EstadoCliRelations {
  // describe navigational properties here
}

export type EstadoCliWithRelations = EstadoCli & EstadoCliRelations;
