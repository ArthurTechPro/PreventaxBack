import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {NitInspec} from './nit-inspec.model';

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

  @property({
    type: 'number',
  })
  CodCiudad?: number;

  @property({
    type: 'number',
  })
  IdTipoDoc?: number;

  @hasMany(() => Usuarios, {keyTo: 'IdNit'})
  NitUsu: Usuarios[];

  @hasMany(() => NitInspec, {keyTo: 'IdNit'})
  NitInspec: NitInspec[];

  constructor(data?: Partial<Nits>) {
    super(data);
  }
}

export interface NitsRelations {
  // describe navigational properties here
}

export type NitsWithRelations = Nits & NitsRelations;
