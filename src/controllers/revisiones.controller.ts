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
import {Revisiones} from '../models';
import {RevisionesRepository} from '../repositories';

export class RevisionesController {
  constructor(
    @repository(RevisionesRepository)
    public revisionesRepository: RevisionesRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/revisiones')
  @response(200, {
    description: 'Revisiones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisiones',
            exclude: ['Id'],
          }),
        },
      },
    })
    revisiones: Omit<Revisiones, 'Id'>,
  ): Promise<Revisiones> {
    return this.revisionesRepository.create(revisiones);
  }

  @get('/revisiones/count')
  @response(200, {
    description: 'Revisiones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Revisiones) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.revisionesRepository.count(where);
  }

  @get('/revisiones')
  @response(200, {
    description: 'Array of Revisiones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Revisiones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Revisiones) filter?: Filter<Revisiones>,
  ): Promise<Revisiones[]> {
    return this.revisionesRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/revisiones')
  @response(200, {
    description: 'Revisiones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Revisiones,
    @param.where(Revisiones) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.revisionesRepository.updateAll(revisiones, where);
  }

  @authenticate('TokenStrategy')
  @get('/revisiones/{id}')
  @response(200, {
    description: 'Revisiones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Revisiones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Revisiones, {exclude: 'where'}) filter?: FilterExcludingWhere<Revisiones>
  ): Promise<Revisiones> {
    return this.revisionesRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/revisiones/{id}')
  @response(204, {
    description: 'Revisiones PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Revisiones,
  ): Promise<void> {
    await this.revisionesRepository.updateById(id, revisiones);
  }

  @authenticate('TokenStrategy')
  @put('/revisiones/{id}')
  @response(204, {
    description: 'Revisiones PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() revisiones: Revisiones,
  ): Promise<void> {
    await this.revisionesRepository.replaceById(id, revisiones);
  }

  @authenticate('TokenStrategy')
  @del('/revisiones/{id}')
  @response(204, {
    description: 'Revisiones DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.revisionesRepository.deleteById(id);
  }
}
