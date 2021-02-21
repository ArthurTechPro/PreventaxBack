import {Entity, hasMany, model, property} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class Servicios extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    postgresql: {
      columnName: 'Id',
      dataType: "Integer",
    },
  })
  Id: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {
      columnName: 'Servicio',
      dataType: "Varchar",
      datalength: 100,
    },
  })
  Servicio: string;

  @hasMany(() => Vehiculos, {keyTo: 'IdServicio'})
  FKServicioVeh: Vehiculos[];

  constructor(data?: Partial<Servicios>) {
    super(data);
  }
}

export interface ServiciosRelations {
  // describe navigational properties here
}

export type ServiciosWithRelations = Servicios & ServiciosRelations;
