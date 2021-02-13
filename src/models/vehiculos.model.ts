import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inspecciones} from './inspecciones.model';

@model()
export class Vehiculos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Placa: string;

  @property({
    type: 'string',
  })
  VehTipo?: string;

  @property({
    type: 'number',
    required: true,
  })
  Modelo: number;

  @property({
    type: 'string',
  })
  Cilindraje?: string;

  @property({
    type: 'string',
  })
  Motor?: string;

  @property({
    type: 'string',
  })
  Chasis?: string;

  @property({
    type: 'string',
  })
  Serial?: string;

  @property({
    type: 'number',
  })
  CapCagra?: number;

  @property({
    type: 'number',
  })
  CapPassajeros?: number;

  @property({
    type: 'string',
  })
  Color?: string;

  @property({
    type: 'string',
  })
  TipoPintura?: string;

  @property({
    type: 'string',
  })
  Combustible?: string;

  @property({
    type: 'string',
  })
  TipoCaja?: string;

  @property({
    type: 'string',
  })
  VIN?: string;

  @property({
    type: 'number',
  })
  CodMarca?: number;

  @property({
    type: 'number',
  })
  CodClase?: number;

  @property({
    type: 'number',
  })
  CodServicio?: number;

  @hasMany(() => Inspecciones, {keyTo: 'IdPlaca'})
  VehInspec: Inspecciones[];

  constructor(data?: Partial<Vehiculos>) {
    super(data);
  }
}

export interface VehiculosRelations {
  // describe navigational properties here
}

export type VehiculosWithRelations = Vehiculos & VehiculosRelations;
