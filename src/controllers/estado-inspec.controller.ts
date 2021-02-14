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
import {EstadoInspec} from '../models';
import {EstadoInspecRepository} from '../repositories';

export class EstadoInspecController {
  constructor(
    @repository(EstadoInspecRepository)
    public estadoInspecRepository : EstadoInspecRepository,
  ) {}

  @post('/estado-inspecs')
  @response(200, {
    description: 'EstadoInspec model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoInspec)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoInspec, {
            title: 'NewEstadoInspec',
            exclude: ['Id'],
          }),
        },
      },
    })
    estadoInspec: Omit<EstadoInspec, 'Id'>,
  ): Promise<EstadoInspec> {
    return this.estadoInspecRepository.create(estadoInspec);
  }

  @get('/estado-inspecs/count')
  @response(200, {
    description: 'EstadoInspec model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoInspec) where?: Where<EstadoInspec>,
  ): Promise<Count> {
    return this.estadoInspecRepository.count(where);
  }

  @get('/estado-inspecs')
  @response(200, {
    description: 'Array of EstadoInspec model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoInspec, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoInspec) filter?: Filter<EstadoInspec>,
  ): Promise<EstadoInspec[]> {
    return this.estadoInspecRepository.find(filter);
  }

  @patch('/estado-inspecs')
  @response(200, {
    description: 'EstadoInspec PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoInspec, {partial: true}),
        },
      },
    })
    estadoInspec: EstadoInspec,
    @param.where(EstadoInspec) where?: Where<EstadoInspec>,
  ): Promise<Count> {
    return this.estadoInspecRepository.updateAll(estadoInspec, where);
  }

  @get('/estado-inspecs/{id}')
  @response(200, {
    description: 'EstadoInspec model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoInspec, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoInspec, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoInspec>
  ): Promise<EstadoInspec> {
    return this.estadoInspecRepository.findById(id, filter);
  }

  @patch('/estado-inspecs/{id}')
  @response(204, {
    description: 'EstadoInspec PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoInspec, {partial: true}),
        },
      },
    })
    estadoInspec: EstadoInspec,
  ): Promise<void> {
    await this.estadoInspecRepository.updateById(id, estadoInspec);
  }

  @put('/estado-inspecs/{id}')
  @response(204, {
    description: 'EstadoInspec PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoInspec: EstadoInspec,
  ): Promise<void> {
    await this.estadoInspecRepository.replaceById(id, estadoInspec);
  }

  @del('/estado-inspecs/{id}')
  @response(204, {
    description: 'EstadoInspec DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoInspecRepository.deleteById(id);
  }
}
