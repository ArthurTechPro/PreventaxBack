import {Entity, model, property} from '@loopback/repository';

@model()
export class Nits extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  Nit?: number;

  @property({
    type: 'number',
  })
  DChequeo?: number;

  @property({
    type: 'string',
  })
  Nombres?: string;

  @property({
    type: 'string',
  })
  Apellidos?: string;

  @property({
    type: 'string',
  })
  Direcciom?: string;

  @property({
    type: 'string',
  })
  Email?: string;

  @property({
    type: 'string',
  })
  TelCel?: string;

  @property({
    type: 'string',
  })
  TelFijo?: string;

  @property({
    type: 'string',
  })
  NomComercial?: string;

  @property({
    type: 'string',
  })
  Sexo?: string;

  @property({
    type: 'date',
  })
  FechaNace?: string;

  @property({
    type: 'date',
  })
  FechaCrea?: string;


  constructor(data?: Partial<Nits>) {
    super(data);
  }
}

export interface NitsRelations {
  // describe navigational properties here
}

export type NitsWithRelations = Nits & NitsRelations;
