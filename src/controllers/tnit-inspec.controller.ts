import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TnitInspec} from '../models';
import {TnitInspecRepository} from '../repositories';

export class TnitInspecController {
  constructor(
    @repository(TnitInspecRepository)
    public tnitInspecRepository : TnitInspecRepository,
  ) {}

  @post('/tnit-inspecs')
  @response(200, {
    description: 'TnitInspec model instance',
    content: {'application/json': {schema: getModelSchemaRef(TnitInspec)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TnitInspec, {
            title: 'NewTnitInspec',
            exclude: ['Id'],
          }),
        },
      },
    })
    tnitInspec: Omit<TnitInspec, 'Id'>,
  ): Promise<TnitInspec> {
    return this.tnitInspecRepository.create(tnitInspec);
  }

  @get('/tnit-inspecs/count')
  @response(200, {
    description: 'TnitInspec model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TnitInspec) where?: Where<TnitInspec>,
  ): Promise<Count> {
    return this.tnitInspecRepository.count(where);
  }

  @get('/tnit-inspecs')
  @response(200, {
    description: 'Array of TnitInspec model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TnitInspec, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TnitInspec) filter?: Filter<TnitInspec>,
  ): Promise<TnitInspec[]> {
    return this.tnitInspecRepository.find(filter);
  }

  @patch('/tnit-inspecs')
  @response(200, {
    description: 'TnitInspec PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TnitInspec, {partial: true}),
        },
      },
    })
    tnitInspec: TnitInspec,
    @param.where(TnitInspec) where?: Where<TnitInspec>,
  ): Promise<Count> {
    return this.tnitInspecRepository.updateAll(tnitInspec, where);
  }

  @get('/tnit-inspecs/{id}')
  @response(200, {
    description: 'TnitInspec model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TnitInspec, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TnitInspec, {exclude: 'where'}) filter?: FilterExcludingWhere<TnitInspec>
  ): Promise<TnitInspec> {
    return this.tnitInspecRepository.findById(id, filter);
  }

  @patch('/tnit-inspecs/{id}')
  @response(204, {
    description: 'TnitInspec PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TnitInspec, {partial: true}),
        },
      },
    })
    tnitInspec: TnitInspec,
  ): Promise<void> {
    await this.tnitInspecRepository.updateById(id, tnitInspec);
  }

  @put('/tnit-inspecs/{id}')
  @response(204, {
    description: 'TnitInspec PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tnitInspec: TnitInspec,
  ): Promise<void> {
    await this.tnitInspecRepository.replaceById(id, tnitInspec);
  }

  @del('/tnit-inspecs/{id}')
  @response(204, {
    description: 'TnitInspec DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tnitInspecRepository.deleteById(id);
  }
}
