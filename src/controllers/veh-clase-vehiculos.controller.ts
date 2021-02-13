import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  VehClase,
  Vehiculos
} from '../models';
import {VehClaseRepository} from '../repositories';

export class VehClaseVehiculosController {
  constructor(
    @repository(VehClaseRepository) protected vehClaseRepository: VehClaseRepository,
  ) { }

  @get('/veh-clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of VehClase has many Vehiculos',
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
    return this.vehClaseRepository.ClaVeh(id).find(filter);
  }

  @post('/veh-clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehClase model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VehClase.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInVehClase',
            exclude: ['Placa'],
            optional: ['CodClase']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'Placa'>,
  ): Promise<Vehiculos> {
    return this.vehClaseRepository.ClaVeh(id).create(vehiculos);
  }

  @patch('/veh-clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehClase.Vehiculos PATCH success count',
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
    return this.vehClaseRepository.ClaVeh(id).patch(vehiculos, where);
  }

  @del('/veh-clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehClase.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.vehClaseRepository.ClaVeh(id).delete(where);
  }
}
