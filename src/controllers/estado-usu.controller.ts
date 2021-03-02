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
import {EstadoUsu} from '../models';
import {EstadoUsuRepository} from '../repositories';

export class EstadoUsuController {
  constructor(
    @repository(EstadoUsuRepository)
    public estadoUsuRepository: EstadoUsuRepository,
  ) { }

  @authenticate('TokenStrategy')  // Usuaro debe estar autenticado
  @post('/estado-usus')
  @response(200, {
    description: 'EstadoUsu model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoUsu)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoUsu, {
            title: 'NewEstadoUsu',
            exclude: ['IdEstado'],
          }),
        },
      },
    })
    estadoUsu: Omit<EstadoUsu, 'IdEstado'>,
  ): Promise<EstadoUsu> {
    return this.estadoUsuRepository.create(estadoUsu);
  }

  @get('/estado-usus/count')
  @response(200, {
    description: 'EstadoUsu model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoUsu) where?: Where<EstadoUsu>,
  ): Promise<Count> {
    return this.estadoUsuRepository.count(where);
  }


  @get('/estado-usus')
  @response(200, {
    description: 'Array of EstadoUsu model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoUsu, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoUsu) filter?: Filter<EstadoUsu>,
  ): Promise<EstadoUsu[]> {
    return this.estadoUsuRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/estado-usus')
  @response(200, {
    description: 'EstadoUsu PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoUsu, {partial: true}),
        },
      },
    })
    estadoUsu: EstadoUsu,
    @param.where(EstadoUsu) where?: Where<EstadoUsu>,
  ): Promise<Count> {
    return this.estadoUsuRepository.updateAll(estadoUsu, where);
  }


  @get('/estado-usus/{id}')
  @response(200, {
    description: 'EstadoUsu model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoUsu, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoUsu, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoUsu>
  ): Promise<EstadoUsu> {
    return this.estadoUsuRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/estado-usus/{id}')
  @response(204, {
    description: 'EstadoUsu PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoUsu, {partial: true}),
        },
      },
    })
    estadoUsu: EstadoUsu,
  ): Promise<void> {
    await this.estadoUsuRepository.updateById(id, estadoUsu);
  }


  @authenticate('TokenStrategy')
  @put('/estado-usus/{id}')
  @response(204, {
    description: 'EstadoUsu PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoUsu: EstadoUsu,
  ): Promise<void> {
    await this.estadoUsuRepository.replaceById(id, estadoUsu);
  }

  @authenticate('TokenStrategy')
  @del('/estado-usus/{id}')
  @response(204, {
    description: 'EstadoUsu DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoUsuRepository.deleteById(id);
  }
}
