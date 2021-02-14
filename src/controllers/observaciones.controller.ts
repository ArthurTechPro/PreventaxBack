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
import {Observaciones} from '../models';
import {ObservacionesRepository} from '../repositories';

export class ObservacionesController {
  constructor(
    @repository(ObservacionesRepository)
    public observacionesRepository : ObservacionesRepository,
  ) {}

  @post('/observaciones')
  @response(200, {
    description: 'Observaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Observaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observaciones, {
            title: 'NewObservaciones',
            exclude: ['Id'],
          }),
        },
      },
    })
    observaciones: Omit<Observaciones, 'Id'>,
  ): Promise<Observaciones> {
    return this.observacionesRepository.create(observaciones);
  }

  @get('/observaciones/count')
  @response(200, {
    description: 'Observaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Observaciones) where?: Where<Observaciones>,
  ): Promise<Count> {
    return this.observacionesRepository.count(where);
  }

  @get('/observaciones')
  @response(200, {
    description: 'Array of Observaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Observaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Observaciones) filter?: Filter<Observaciones>,
  ): Promise<Observaciones[]> {
    return this.observacionesRepository.find(filter);
  }

  @patch('/observaciones')
  @response(200, {
    description: 'Observaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observaciones, {partial: true}),
        },
      },
    })
    observaciones: Observaciones,
    @param.where(Observaciones) where?: Where<Observaciones>,
  ): Promise<Count> {
    return this.observacionesRepository.updateAll(observaciones, where);
  }

  @get('/observaciones/{id}')
  @response(200, {
    description: 'Observaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Observaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Observaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Observaciones>
  ): Promise<Observaciones> {
    return this.observacionesRepository.findById(id, filter);
  }

  @patch('/observaciones/{id}')
  @response(204, {
    description: 'Observaciones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observaciones, {partial: true}),
        },
      },
    })
    observaciones: Observaciones,
  ): Promise<void> {
    await this.observacionesRepository.updateById(id, observaciones);
  }

  @put('/observaciones/{id}')
  @response(204, {
    description: 'Observaciones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() observaciones: Observaciones,
  ): Promise<void> {
    await this.observacionesRepository.replaceById(id, observaciones);
  }

  @del('/observaciones/{id}')
  @response(204, {
    description: 'Observaciones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.observacionesRepository.deleteById(id);
  }
}
