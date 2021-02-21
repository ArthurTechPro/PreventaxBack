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
  Marcas,
  Vehiculos,
} from '../models';
import {MarcasRepository} from '../repositories';

export class MarcasVehiculosController {
  constructor(
    @repository(MarcasRepository) protected marcasRepository: MarcasRepository,
  ) { }

  @get('/marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Marcas has many Vehiculos',
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
    return this.marcasRepository.FKMarcaVeh(id).find(filter);
  }

  @post('/marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Marcas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Marcas.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInMarcas',
            exclude: ['Placa'],
            optional: ['IdMarca']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'Placa'>,
  ): Promise<Vehiculos> {
    return this.marcasRepository.FKMarcaVeh(id).create(vehiculos);
  }

  @patch('/marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Marcas.Vehiculos PATCH success count',
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
    return this.marcasRepository.FKMarcaVeh(id).patch(vehiculos, where);
  }

  @del('/marcas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Marcas.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.marcasRepository.FKMarcaVeh(id).delete(where);
  }
}
