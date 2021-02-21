import {Entity, model, property} from '@loopback/repository';

@model()
export class ValorInspec extends Entity {
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
    type: 'date',
    postgresql: {
      columnName: 'Fecha',
      dataType: "date",
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: "N",
    },
  })
  Fecha?: Date;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'Valor',
      dataType: "Decimal(16,2)"
    },
  })
  Valor?: number;

  @property({
    type: 'number',
  })
  IdTipoFuente?: number;

  @property({
    type: 'number',
  })
  IdInspec?: number;

  constructor(data?: Partial<ValorInspec>) {
    super(data);
  }
}

export interface ValorInspecRelations {
  // describe navigational properties here
}

export type ValorInspecWithRelations = ValorInspec & ValorInspecRelations;
