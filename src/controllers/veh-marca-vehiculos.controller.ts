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
  Vehiculos, VehMarca
} from '../models';
import {VehMarcaRepository} from '../repositories';

export class VehMarcaVehiculosController {
  constructor(
    @repository(VehMarcaRepository) protected vehMarcaRepository: VehMarcaRepository,
  ) { }

  @get('/veh-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of VehMarca has many Vehiculos',
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
    return this.vehMarcaRepository.MarVeh(id).find(filter);
  }

  @post('/veh-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehMarca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VehMarca.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInVehMarca',
            exclude: ['Placa'],
            optional: ['CodMarca']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'Placa'>,
  ): Promise<Vehiculos> {
    return this.vehMarcaRepository.MarVeh(id).create(vehiculos);
  }

  @patch('/veh-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehMarca.Vehiculos PATCH success count',
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
    return this.vehMarcaRepository.MarVeh(id).patch(vehiculos, where);
  }

  @del('/veh-marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'VehMarca.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.vehMarcaRepository.MarVeh(id).delete(where);
  }
}
