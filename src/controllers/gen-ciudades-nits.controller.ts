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
  GenCiudades,
  Nits,
} from '../models';
import {GenCiudadesRepository} from '../repositories';

export class GenCiudadesNitsController {
  constructor(
    @repository(GenCiudadesRepository) protected genCiudadesRepository: GenCiudadesRepository,
  ) { }

  @get('/gen-ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'Array of GenCiudades has many Nits',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Nits)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Nits>,
  ): Promise<Nits[]> {
    return this.genCiudadesRepository.CiuNit(id).find(filter);
  }

  @post('/gen-ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nits)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GenCiudades.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {
            title: 'NewNitsInGenCiudades',
            exclude: ['Nit'],
            optional: ['CodCiudad']
          }),
        },
      },
    }) nits: Omit<Nits, 'Nit'>,
  ): Promise<Nits> {
    return this.genCiudadesRepository.CiuNit(id).create(nits);
  }

  @patch('/gen-ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiudades.Nits PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {partial: true}),
        },
      },
    })
    nits: Partial<Nits>,
    @param.query.object('where', getWhereSchemaFor(Nits)) where?: Where<Nits>,
  ): Promise<Count> {
    return this.genCiudadesRepository.CiuNit(id).patch(nits, where);
  }

  @del('/gen-ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiudades.Nits DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Nits)) where?: Where<Nits>,
  ): Promise<Count> {
    return this.genCiudadesRepository.CiuNit(id).delete(where);
  }
}
