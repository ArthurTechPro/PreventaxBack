import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inspecciones} from './inspecciones.model';

@model()
export class EstadoInspec extends Entity {
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

  @hasMany(() => Inspecciones, {keyTo: 'IdEstado'})
  FKEstInsp: Inspecciones[];

  constructor(data?: Partial<EstadoInspec>) {
    super(data);
  }
}

export interface EstadoInspecRelations {
  // describe navigational properties here
}

export type EstadoInspecWithRelations = EstadoInspec & EstadoInspecRelations;
