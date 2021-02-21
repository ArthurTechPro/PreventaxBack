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
  Nits,
  NitInspec,
} from '../models';
import {NitsRepository} from '../repositories';

export class NitsNitInspecController {
  constructor(
    @repository(NitsRepository) protected nitsRepository: NitsRepository,
  ) { }

  @get('/nits/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Array of Nits has many NitInspec',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NitInspec)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<NitInspec>,
  ): Promise<NitInspec[]> {
    return this.nitsRepository.FKNitsInspec(id).find(filter);
  }

  @post('/nits/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Nits model instance',
        content: {'application/json': {schema: getModelSchemaRef(NitInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Nits.prototype.Nit,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NitInspec, {
            title: 'NewNitInspecInNits',
            exclude: ['Id'],
            optional: ['IdNit']
          }),
        },
      },
    }) nitInspec: Omit<NitInspec, 'Id'>,
  ): Promise<NitInspec> {
    return this.nitsRepository.FKNitsInspec(id).create(nitInspec);
  }

  @patch('/nits/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Nits.NitInspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NitInspec, {partial: true}),
        },
      },
    })
    nitInspec: Partial<NitInspec>,
    @param.query.object('where', getWhereSchemaFor(NitInspec)) where?: Where<NitInspec>,
  ): Promise<Count> {
    return this.nitsRepository.FKNitsInspec(id).patch(nitInspec, where);
  }

  @del('/nits/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Nits.NitInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(NitInspec)) where?: Where<NitInspec>,
  ): Promise<Count> {
    return this.nitsRepository.FKNitsInspec(id).delete(where);
  }
}
