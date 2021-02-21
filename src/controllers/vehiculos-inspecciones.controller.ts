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
  Inspecciones, Vehiculos
} from '../models';
import {VehiculosRepository} from '../repositories';

export class VehiculosInspeccionesController {
  constructor(
    @repository(VehiculosRepository) protected vehiculosRepository: VehiculosRepository,
  ) { }

  @get('/vehiculos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Array of Vehiculos has many Inspecciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inspecciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inspecciones>,
  ): Promise<Inspecciones[]> {
    return this.vehiculosRepository.FKVehiculoInspec(id).find(filter);
  }

  @post('/vehiculos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Vehiculos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inspecciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculos.prototype.Placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {
            title: 'NewInspeccionesInVehiculos',
            exclude: ['Id'],
            optional: ['IdPlaca']
          }),
        },
      },
    }) inspecciones: Omit<Inspecciones, 'Id'>,
  ): Promise<Inspecciones> {
    return this.vehiculosRepository.FKVehiculoInspec(id).create(inspecciones);
  }

  @patch('/vehiculos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Vehiculos.Inspecciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {partial: true}),
        },
      },
    })
    inspecciones: Partial<Inspecciones>,
    @param.query.object('where', getWhereSchemaFor(Inspecciones)) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.vehiculosRepository.FKVehiculoInspec(id).patch(inspecciones, where);
  }

  @del('/vehiculos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Vehiculos.Inspecciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inspecciones)) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.vehiculosRepository.FKVehiculoInspec(id).delete(where);
  }
}
