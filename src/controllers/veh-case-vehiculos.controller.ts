import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  VehCase,
  Vehiculos,
} from '../models';
import {VehCaseRepository} from '../repositories';

export class VehCaseVehiculosController {
  constructor(
    @repository(VehCaseRepository) protected vehCaseRepository: VehCaseRepository,
  ) { }

  @get('/veh-cases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of VehCase has many Vehiculos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehiculos>,
  ): Promise<Vehiculos[]> {
    return this.vehCaseRepository.FKClaVeh(id).find(filter);
  }

  @post('/veh-cases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehCase model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VehCase.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInVehCase',
            exclude: ['Placa'],
            optional: ['CodClase']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'Placa'>,
  ): Promise<Vehiculos> {
    return this.vehCaseRepository.FKClaVeh(id).create(vehiculos);
  }

  @patch('/veh-cases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehCase.Vehiculos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {partial: true}),
        },
      },
    })
    vehiculos: Partial<Vehiculos>,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.vehCaseRepository.FKClaVeh(id).patch(vehiculos, where);
  }

  @del('/veh-cases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehCase.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.vehCaseRepository.FKClaVeh(id).delete(where);
  }
}
