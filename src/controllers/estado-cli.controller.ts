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
import {EstadoCli} from '../models';
import {EstadoCliRepository} from '../repositories';

export class EstadoCliController {
  constructor(
    @repository(EstadoCliRepository)
    public estadoCliRepository : EstadoCliRepository,
  ) {}

  @post('/estado-clis')
  @response(200, {
    description: 'EstadoCli model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoCli)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoCli, {
            title: 'NewEstadoCli',
            exclude: ['Id'],
          }),
        },
      },
    })
    estadoCli: Omit<EstadoCli, 'Id'>,
  ): Promise<EstadoCli> {
    return this.estadoCliRepository.create(estadoCli);
  }

  @get('/estado-clis/count')
  @response(200, {
    description: 'EstadoCli model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoCli) where?: Where<EstadoCli>,
  ): Promise<Count> {
    return this.estadoCliRepository.count(where);
  }

  @get('/estado-clis')
  @response(200, {
    description: 'Array of EstadoCli model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoCli, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoCli) filter?: Filter<EstadoCli>,
  ): Promise<EstadoCli[]> {
    return this.estadoCliRepository.find(filter);
  }

  @patch('/estado-clis')
  @response(200, {
    description: 'EstadoCli PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoCli, {partial: true}),
        },
      },
    })
    estadoCli: EstadoCli,
    @param.where(EstadoCli) where?: Where<EstadoCli>,
  ): Promise<Count> {
    return this.estadoCliRepository.updateAll(estadoCli, where);
  }

  @get('/estado-clis/{id}')
  @response(200, {
    description: 'EstadoCli model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoCli, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoCli, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoCli>
  ): Promise<EstadoCli> {
    return this.estadoCliRepository.findById(id, filter);
  }

  @patch('/estado-clis/{id}')
  @response(204, {
    description: 'EstadoCli PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoCli, {partial: true}),
        },
      },
    })
    estadoCli: EstadoCli,
  ): Promise<void> {
    await this.estadoCliRepository.updateById(id, estadoCli);
  }

  @put('/estado-clis/{id}')
  @response(204, {
    description: 'EstadoCli PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoCli: EstadoCli,
  ): Promise<void> {
    await this.estadoCliRepository.replaceById(id, estadoCli);
  }

  @del('/estado-clis/{id}')
  @response(204, {
    description: 'EstadoCli DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoCliRepository.deleteById(id);
  }
}
