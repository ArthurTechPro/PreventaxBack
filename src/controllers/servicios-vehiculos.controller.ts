import {authenticate} from '@loopback/authentication';
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
  Servicios,
  Vehiculos
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosVehiculosController {
  constructor(
    @repository(ServiciosRepository) protected serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Servicios has many Vehiculos',
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
    return this.serviciosRepository.FKServicioVeh(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Servicios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Servicios.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInServicios',
            exclude: ['Placa'],
            optional: ['IdServicio']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'Placa'>,
  ): Promise<Vehiculos> {
    return this.serviciosRepository.FKServicioVeh(id).create(vehiculos);
  }

  @authenticate('TokenStrategy')
  @patch('/servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Servicios.Vehiculos PATCH success count',
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
    return this.serviciosRepository.FKServicioVeh(id).patch(vehiculos, where);
  }

  @authenticate('TokenStrategy')
  @del('/servicios/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Servicios.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.serviciosRepository.FKServicioVeh(id).delete(where);
  }
}
