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
  GenCiuddes,
  Nits,
} from '../models';
import {GenCiuddesRepository} from '../repositories';

export class GenCiuddesNitsController {
  constructor(
    @repository(GenCiuddesRepository) protected genCiuddesRepository: GenCiuddesRepository,
  ) { }

  @get('/gen-ciuddes/{id}/nits', {
    responses: {
      '200': {
        description: 'Array of GenCiuddes has many Nits',
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
    return this.genCiuddesRepository.FKCiuNit(id).find(filter);
  }

  @post('/gen-ciuddes/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiuddes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nits)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GenCiuddes.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {
            title: 'NewNitsInGenCiuddes',
            exclude: ['Nit'],
            optional: ['IdCiudad']
          }),
        },
      },
    }) nits: Omit<Nits, 'Nit'>,
  ): Promise<Nits> {
    return this.genCiuddesRepository.FKCiuNit(id).create(nits);
  }

  @patch('/gen-ciuddes/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiuddes.Nits PATCH success count',
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
    return this.genCiuddesRepository.FKCiuNit(id).patch(nits, where);
  }

  @del('/gen-ciuddes/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiuddes.Nits DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Nits)) where?: Where<Nits>,
  ): Promise<Count> {
    return this.genCiuddesRepository.FKCiuNit(id).delete(where);
  }
}
