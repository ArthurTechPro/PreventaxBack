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
  VehServicio,
  Vehiculos,
} from '../models';
import {VehServicioRepository} from '../repositories';

export class VehServicioVehiculosController {
  constructor(
    @repository(VehServicioRepository) protected vehServicioRepository: VehServicioRepository,
  ) { }

  @get('/veh-servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of VehServicio has many Vehiculos',
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
    return this.vehServicioRepository.SerVeh(id).find(filter);
  }

  @post('/veh-servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VehServicio.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInVehServicio',
            exclude: ['Placa'],
            optional: ['CodServicio']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'Placa'>,
  ): Promise<Vehiculos> {
    return this.vehServicioRepository.SerVeh(id).create(vehiculos);
  }

  @patch('/veh-servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehServicio.Vehiculos PATCH success count',
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
    return this.vehServicioRepository.SerVeh(id).patch(vehiculos, where);
  }

  @del('/veh-servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehServicio.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.vehServicioRepository.SerVeh(id).delete(where);
  }
}
