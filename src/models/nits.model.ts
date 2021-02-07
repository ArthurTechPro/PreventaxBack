import {Entity, model, property, hasMany} from '@loopback/repository';
import {NitInspec} from './nit-inspec.model';
import {Usuarios} from './usuarios.model';

@model()
export class Nits extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  Nit: number;

  @property({
    type: 'number',
  })
  dchequeo?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
  })
  Direccion?: string;

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

  @property({
    type: 'number',
  })
  IdTipo?: number;

  @hasMany(() => NitInspec, {keyTo: 'Nit'})
  FKNitIsnp: NitInspec[];

  @hasMany(() => Usuarios, {keyTo: 'Nit'})
  FKNitUsu: Usuarios[];

  @property({
    type: 'number',
  })
  IdCiudad?: number;

  constructor(data?: Partial<Nits>) {
    super(data);
  }
}

export interface NitsRelations {
  // describe navigational properties here
}

export type NitsWithRelations = Nits & NitsRelations;
