import {Entity, model, property} from '@loopback/repository';

@model()
export class Fasecolda extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  Codigo: number;

  @property({
    type: 'number',
  })
  CodTipo?: number;

  @property({
    type: 'string',
  })
  Refe1?: string;

  @property({
    type: 'string',
  })
  Refe2?: string;

  @property({
    type: 'string',
  })
  Refe3?: string;

  @property({
    type: 'number',
  })
  Peso?: number;

  @property({
    type: 'number',
  })
  Bcpp?: number;

  @property({
    type: 'number',
  })
  Importado?: number;

  @property({
    type: 'number',
  })
  Potencia?: number;

  @property({
    type: 'string',
  })
  TipoCaja?: string;

  @property({
    type: 'number',
  })
  Cilindraje?: number;

  @property({
    type: 'string',
  })
  Nacionalidad?: string;

  @property({
    type: 'number',
  })
  CapPasajeros?: number;

  @property({
    type: 'number',
  })
  CapCarga?: number;

  @property({
    type: 'number',
  })
  Puertas?: number;

  @property({
    type: 'number',
  })
  AireAcond?: number;

  @property({
    type: 'number',
  })
  Ejes?: number;

  @property({
    type: 'string',
  })
  Combustible?: string;

  @property({
    type: 'string',
  })
  Transmision?: string;

  @property({
    type: 'number',
  })
  Um?: number;


  constructor(data?: Partial<Fasecolda>) {
    super(data);
  }
}

export interface FasecoldaRelations {
  // describe navigational properties here
}

export type FasecoldaWithRelations = Fasecolda & FasecoldaRelations;
