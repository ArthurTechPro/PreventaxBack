import {Entity, model, property} from '@loopback/repository';

@model()
export class GenDeptos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  Codigo: number;

  @property({
    type: 'string',
    required: true,
  })
  Descrip: string;


  constructor(data?: Partial<GenDeptos>) {
    super(data);
  }
}

export interface GenDeptosRelations {
  // describe navigational properties here
}

export type GenDeptosWithRelations = GenDeptos & GenDeptosRelations;
