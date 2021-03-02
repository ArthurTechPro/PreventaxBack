
import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Nits} from '../models';
import {NitsRepository} from '../repositories';

export class NitsController {
  constructor(
    @repository(NitsRepository)
    public nitsRepository: NitsRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/nits')
  @response(200, {
    description: 'Nits model instance',
    content: {'application/json': {schema: getModelSchemaRef(Nits)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {
            title: 'NewNits',

          }),
        },
      },
    })
    nits: Nits,
  ): Promise<Nits> {
    return this.nitsRepository.create(nits);
  }

  @get('/nits/count')
  @response(200, {
    description: 'Nits model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Nits) where?: Where<Nits>,
  ): Promise<Count> {
    return this.nitsRepository.count(where);
  }

  @get('/nits')
  @response(200, {
    description: 'Array of Nits model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Nits, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Nits) filter?: Filter<Nits>,
  ): Promise<Nits[]> {
    return this.nitsRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/nits')
  @response(200, {
    description: 'Nits PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {partial: true}),
        },
      },
    })
    nits: Nits,
    @param.where(Nits) where?: Where<Nits>,
  ): Promise<Count> {
    return this.nitsRepository.updateAll(nits, where);
  }

  @authenticate('TokenStrategy')
  @get('/nits/{id}')
  @response(200, {
    description: 'Nits model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Nits, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Nits, {exclude: 'where'}) filter?: FilterExcludingWhere<Nits>
  ): Promise<Nits> {
    return this.nitsRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/nits/{id}')
  @response(204, {
    description: 'Nits PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {partial: true}),
        },
      },
    })
    nits: Nits,
  ): Promise<void> {
    await this.nitsRepository.updateById(id, nits);
  }

  @authenticate('TokenStrategy')
  @put('/nits/{id}')
  @response(204, {
    description: 'Nits PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() nits: Nits,
  ): Promise<void> {
    await this.nitsRepository.replaceById(id, nits);
  }

  @authenticate('TokenStrategy')
  @del('/nits/{id}')
  @response(204, {
    description: 'Nits DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.nitsRepository.deleteById(id);
  }
}
