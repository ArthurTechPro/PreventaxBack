import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inspecciones} from './inspecciones.model';

@model()
export class EstadoInspec extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'Id',
      dataType: "Integer",
    },
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {
      columnName: 'Descrip',
      dataType: "Varchar",
      datalength: 50,
    },
  })
  Descrip: string;

  @hasMany(() => Inspecciones, {keyTo: 'IdEstadoInspec'})
  FKEstadoInspec: Inspecciones[];

  constructor(data?: Partial<EstadoInspec>) {
    super(data);
  }
}

export interface EstadoInspecRelations {
  // describe navigational properties here
}

export type EstadoInspecWithRelations = EstadoInspec & EstadoInspecRelations;
