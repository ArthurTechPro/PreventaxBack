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
import {GenDeptos} from '../models';
import {GenDeptosRepository} from '../repositories';

export class GenDeptosController {
  constructor(
    @repository(GenDeptosRepository)
    public genDeptosRepository : GenDeptosRepository,
  ) {}

  @post('/gen-deptos')
  @response(200, {
    description: 'GenDeptos model instance',
    content: {'application/json': {schema: getModelSchemaRef(GenDeptos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenDeptos, {
            title: 'NewGenDeptos',
            
          }),
        },
      },
    })
    genDeptos: GenDeptos,
  ): Promise<GenDeptos> {
    return this.genDeptosRepository.create(genDeptos);
  }

  @get('/gen-deptos/count')
  @response(200, {
    description: 'GenDeptos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GenDeptos) where?: Where<GenDeptos>,
  ): Promise<Count> {
    return this.genDeptosRepository.count(where);
  }

  @get('/gen-deptos')
  @response(200, {
    description: 'Array of GenDeptos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GenDeptos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GenDeptos) filter?: Filter<GenDeptos>,
  ): Promise<GenDeptos[]> {
    return this.genDeptosRepository.find(filter);
  }

  @patch('/gen-deptos')
  @response(200, {
    description: 'GenDeptos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenDeptos, {partial: true}),
        },
      },
    })
    genDeptos: GenDeptos,
    @param.where(GenDeptos) where?: Where<GenDeptos>,
  ): Promise<Count> {
    return this.genDeptosRepository.updateAll(genDeptos, where);
  }

  @get('/gen-deptos/{id}')
  @response(200, {
    description: 'GenDeptos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GenDeptos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GenDeptos, {exclude: 'where'}) filter?: FilterExcludingWhere<GenDeptos>
  ): Promise<GenDeptos> {
    return this.genDeptosRepository.findById(id, filter);
  }

  @patch('/gen-deptos/{id}')
  @response(204, {
    description: 'GenDeptos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenDeptos, {partial: true}),
        },
      },
    })
    genDeptos: GenDeptos,
  ): Promise<void> {
    await this.genDeptosRepository.updateById(id, genDeptos);
  }

  @put('/gen-deptos/{id}')
  @response(204, {
    description: 'GenDeptos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() genDeptos: GenDeptos,
  ): Promise<void> {
    await this.genDeptosRepository.replaceById(id, genDeptos);
  }

  @del('/gen-deptos/{id}')
  @response(204, {
    description: 'GenDeptos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.genDeptosRepository.deleteById(id);
  }
}
