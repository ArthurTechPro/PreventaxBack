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
import {ValoresInspec} from '../models';
import {ValoresInspecRepository} from '../repositories';

export class ValoresInspecController {
  constructor(
    @repository(ValoresInspecRepository)
    public valoresInspecRepository : ValoresInspecRepository,
  ) {}

  @post('/valores-inspecs')
  @response(200, {
    description: 'ValoresInspec model instance',
    content: {'application/json': {schema: getModelSchemaRef(ValoresInspec)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValoresInspec, {
            title: 'NewValoresInspec',
            exclude: ['Id'],
          }),
        },
      },
    })
    valoresInspec: Omit<ValoresInspec, 'Id'>,
  ): Promise<ValoresInspec> {
    return this.valoresInspecRepository.create(valoresInspec);
  }

  @get('/valores-inspecs/count')
  @response(200, {
    description: 'ValoresInspec model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ValoresInspec) where?: Where<ValoresInspec>,
  ): Promise<Count> {
    return this.valoresInspecRepository.count(where);
  }

  @get('/valores-inspecs')
  @response(200, {
    description: 'Array of ValoresInspec model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ValoresInspec, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ValoresInspec) filter?: Filter<ValoresInspec>,
  ): Promise<ValoresInspec[]> {
    return this.valoresInspecRepository.find(filter);
  }

  @patch('/valores-inspecs')
  @response(200, {
    description: 'ValoresInspec PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValoresInspec, {partial: true}),
        },
      },
    })
    valoresInspec: ValoresInspec,
    @param.where(ValoresInspec) where?: Where<ValoresInspec>,
  ): Promise<Count> {
    return this.valoresInspecRepository.updateAll(valoresInspec, where);
  }

  @get('/valores-inspecs/{id}')
  @response(200, {
    description: 'ValoresInspec model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ValoresInspec, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ValoresInspec, {exclude: 'where'}) filter?: FilterExcludingWhere<ValoresInspec>
  ): Promise<ValoresInspec> {
    return this.valoresInspecRepository.findById(id, filter);
  }

  @patch('/valores-inspecs/{id}')
  @response(204, {
    description: 'ValoresInspec PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValoresInspec, {partial: true}),
        },
      },
    })
    valoresInspec: ValoresInspec,
  ): Promise<void> {
    await this.valoresInspecRepository.updateById(id, valoresInspec);
  }

  @put('/valores-inspecs/{id}')
  @response(204, {
    description: 'ValoresInspec PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() valoresInspec: ValoresInspec,
  ): Promise<void> {
    await this.valoresInspecRepository.replaceById(id, valoresInspec);
  }

  @del('/valores-inspecs/{id}')
  @response(204, {
    description: 'ValoresInspec DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.valoresInspecRepository.deleteById(id);
  }
}
