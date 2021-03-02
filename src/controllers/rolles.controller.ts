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
import {Rolles} from '../models';
import {RollesRepository} from '../repositories';

export class RollesController {
  constructor(
    @repository(RollesRepository)
    public rollesRepository: RollesRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/rolles')
  @response(200, {
    description: 'Rolles model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rolles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolles, {
            title: 'NewRolles',
          }),
        },
      },
    })
    rolles: Omit<Rolles, 'Id'>,
  ): Promise<Rolles> {
    return this.rollesRepository.create(rolles);
  }

  @get('/rolles/count')
  @response(200, {
    description: 'Rolles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rolles) where?: Where<Rolles>,
  ): Promise<Count> {
    return this.rollesRepository.count(where);
  }

  @get('/rolles')
  @response(200, {
    description: 'Array of Rolles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rolles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rolles) filter?: Filter<Rolles>,
  ): Promise<Rolles[]> {
    return this.rollesRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/rolles')
  @response(200, {
    description: 'Rolles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolles, {partial: true}),
        },
      },
    })
    rolles: Rolles,
    @param.where(Rolles) where?: Where<Rolles>,
  ): Promise<Count> {
    return this.rollesRepository.updateAll(rolles, where);
  }

  @get('/rolles/{id}')
  @response(200, {
    description: 'Rolles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rolles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rolles, {exclude: 'where'}) filter?: FilterExcludingWhere<Rolles>
  ): Promise<Rolles> {
    return this.rollesRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/rolles/{id}')
  @response(204, {
    description: 'Rolles PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rolles, {partial: true}),
        },
      },
    })
    rolles: Rolles,
  ): Promise<void> {
    await this.rollesRepository.updateById(id, rolles);
  }

  @authenticate('TokenStrategy')
  @put('/rolles/{id}')
  @response(204, {
    description: 'Rolles PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rolles: Rolles,
  ): Promise<void> {
    await this.rollesRepository.replaceById(id, rolles);
  }

  @authenticate('TokenStrategy')
  @del('/rolles/{id}')
  @response(204, {
    description: 'Rolles DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rollesRepository.deleteById(id);
  }
}
