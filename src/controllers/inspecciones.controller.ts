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
import {Inspecciones} from '../models';
import {InspeccionesRepository} from '../repositories';

export class InspeccionesController {
  constructor(
    @repository(InspeccionesRepository)
    public inspeccionesRepository : InspeccionesRepository,
  ) {}

  @post('/inspecciones')
  @response(200, {
    description: 'Inspecciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Inspecciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {
            title: 'NewInspecciones',
            exclude: ['Id'],
          }),
        },
      },
    })
    inspecciones: Omit<Inspecciones, 'Id'>,
  ): Promise<Inspecciones> {
    return this.inspeccionesRepository.create(inspecciones);
  }

  @get('/inspecciones/count')
  @response(200, {
    description: 'Inspecciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Inspecciones) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.inspeccionesRepository.count(where);
  }

  @get('/inspecciones')
  @response(200, {
    description: 'Array of Inspecciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inspecciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Inspecciones) filter?: Filter<Inspecciones>,
  ): Promise<Inspecciones[]> {
    return this.inspeccionesRepository.find(filter);
  }

  @patch('/inspecciones')
  @response(200, {
    description: 'Inspecciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {partial: true}),
        },
      },
    })
    inspecciones: Inspecciones,
    @param.where(Inspecciones) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.inspeccionesRepository.updateAll(inspecciones, where);
  }

  @get('/inspecciones/{id}')
  @response(200, {
    description: 'Inspecciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inspecciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Inspecciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Inspecciones>
  ): Promise<Inspecciones> {
    return this.inspeccionesRepository.findById(id, filter);
  }

  @patch('/inspecciones/{id}')
  @response(204, {
    description: 'Inspecciones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {partial: true}),
        },
      },
    })
    inspecciones: Inspecciones,
  ): Promise<void> {
    await this.inspeccionesRepository.updateById(id, inspecciones);
  }

  @put('/inspecciones/{id}')
  @response(204, {
    description: 'Inspecciones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() inspecciones: Inspecciones,
  ): Promise<void> {
    await this.inspeccionesRepository.replaceById(id, inspecciones);
  }

  @del('/inspecciones/{id}')
  @response(204, {
    description: 'Inspecciones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.inspeccionesRepository.deleteById(id);
  }
}
