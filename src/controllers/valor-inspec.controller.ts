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
import {ValorInspec} from '../models';
import {ValorInspecRepository} from '../repositories';

export class ValorInspecController {
  constructor(
    @repository(ValorInspecRepository)
    public valorInspecRepository: ValorInspecRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/valor-inspecs')
  @response(200, {
    description: 'ValorInspec model instance',
    content: {'application/json': {schema: getModelSchemaRef(ValorInspec)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorInspec, {
            title: 'NewValorInspec',
            exclude: ['Id'],
          }),
        },
      },
    })
    valorInspec: Omit<ValorInspec, 'Id'>,
  ): Promise<ValorInspec> {
    return this.valorInspecRepository.create(valorInspec);
  }


  @get('/valor-inspecs/count')
  @response(200, {
    description: 'ValorInspec model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ValorInspec) where?: Where<ValorInspec>,
  ): Promise<Count> {
    return this.valorInspecRepository.count(where);
  }

  @get('/valor-inspecs')
  @response(200, {
    description: 'Array of ValorInspec model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ValorInspec, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ValorInspec) filter?: Filter<ValorInspec>,
  ): Promise<ValorInspec[]> {
    return this.valorInspecRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/valor-inspecs')
  @response(200, {
    description: 'ValorInspec PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorInspec, {partial: true}),
        },
      },
    })
    valorInspec: ValorInspec,
    @param.where(ValorInspec) where?: Where<ValorInspec>,
  ): Promise<Count> {
    return this.valorInspecRepository.updateAll(valorInspec, where);
  }

  @get('/valor-inspecs/{id}')
  @response(200, {
    description: 'ValorInspec model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ValorInspec, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ValorInspec, {exclude: 'where'}) filter?: FilterExcludingWhere<ValorInspec>
  ): Promise<ValorInspec> {
    return this.valorInspecRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/valor-inspecs/{id}')
  @response(204, {
    description: 'ValorInspec PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorInspec, {partial: true}),
        },
      },
    })
    valorInspec: ValorInspec,
  ): Promise<void> {
    await this.valorInspecRepository.updateById(id, valorInspec);
  }

  @authenticate('TokenStrategy')
  @put('/valor-inspecs/{id}')
  @response(204, {
    description: 'ValorInspec PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() valorInspec: ValorInspec,
  ): Promise<void> {
    await this.valorInspecRepository.replaceById(id, valorInspec);
  }

  @authenticate('TokenStrategy')
  @del('/valor-inspecs/{id}')
  @response(204, {
    description: 'ValorInspec DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.valorInspecRepository.deleteById(id);
  }
}
