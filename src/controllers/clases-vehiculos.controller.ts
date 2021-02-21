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
  Clases,
  Vehiculos,
} from '../models';
import {ClasesRepository} from '../repositories';

export class ClasesVehiculosController {
  constructor(
    @repository(ClasesRepository) protected clasesRepository: ClasesRepository,
  ) { }

  @get('/clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Clases has many Vehiculos',
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
    return this.clasesRepository.FKClaseVeh(id).find(filter);
  }

  @post('/clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Clases model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Clases.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInClases',
            exclude: ['Placa'],
            optional: ['IdClase']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'Placa'>,
  ): Promise<Vehiculos> {
    return this.clasesRepository.FKClaseVeh(id).create(vehiculos);
  }

  @patch('/clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Clases.Vehiculos PATCH success count',
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
    return this.clasesRepository.FKClaseVeh(id).patch(vehiculos, where);
  }

  @del('/clases/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Clases.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.clasesRepository.FKClaseVeh(id).delete(where);
  }
}
