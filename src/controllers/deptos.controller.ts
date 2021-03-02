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
import {Deptos} from '../models';
import {DeptosRepository} from '../repositories';

export class GenDeptosController {
  constructor(
    @repository(DeptosRepository)
    public deptosRepository: DeptosRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/deptos')
  @response(200, {
    description: 'GenDeptos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Deptos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deptos, {
            title: 'NewGenDeptos',

          }),
        },
      },
    })
    deptos: Deptos,
  ): Promise<Deptos> {
    return this.deptosRepository.create(deptos);
  }

  @get('/deptos/count')
  @response(200, {
    description: 'GenDeptos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Deptos) where?: Where<Deptos>,
  ): Promise<Count> {
    return this.deptosRepository.count(where);
  }

  @get('/deptos')
  @response(200, {
    description: 'Array of GenDeptos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Deptos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Deptos) filter?: Filter<Deptos>,
  ): Promise<Deptos[]> {
    return this.deptosRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/deptos')
  @response(200, {
    description: 'GenDeptos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deptos, {partial: true}),
        },
      },
    })
    deptos: Deptos,
    @param.where(Deptos) where?: Where<Deptos>,
  ): Promise<Count> {
    return this.deptosRepository.updateAll(deptos, where);
  }

  @get('/deptos/{id}')
  @response(200, {
    description: 'GenDeptos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deptos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Deptos, {exclude: 'where'}) filter?: FilterExcludingWhere<Deptos>
  ): Promise<Deptos> {
    return this.deptosRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/deptos/{id}')
  @response(204, {
    description: 'GenDeptos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deptos, {partial: true}),
        },
      },
    })
    deptos: Deptos,
  ): Promise<void> {
    await this.deptosRepository.updateById(id, deptos);
  }

  @authenticate('TokenStrategy')
  @put('/deptos/{id}')
  @response(204, {
    description: 'GenDeptos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deptos: Deptos,
  ): Promise<void> {
    await this.deptosRepository.replaceById(id, deptos);
  }

  @authenticate('TokenStrategy')
  @del('/deptos/{id}')
  @response(204, {
    description: 'GenDeptos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deptosRepository.deleteById(id);
  }
}
