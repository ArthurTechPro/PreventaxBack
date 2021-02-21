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
import {GenCiudades} from '../models';
import {GenCiudadesRepository} from '../repositories';

export class GenCiudadesController {
  constructor(
    @repository(GenCiudadesRepository)
    public genCiudadesRepository : GenCiudadesRepository,
  ) {}

  @post('/gen-ciudades')
  @response(200, {
    description: 'GenCiudades model instance',
    content: {'application/json': {schema: getModelSchemaRef(GenCiudades)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenCiudades, {
            title: 'NewGenCiudades',
            
          }),
        },
      },
    })
    genCiudades: GenCiudades,
  ): Promise<GenCiudades> {
    return this.genCiudadesRepository.create(genCiudades);
  }

  @get('/gen-ciudades/count')
  @response(200, {
    description: 'GenCiudades model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GenCiudades) where?: Where<GenCiudades>,
  ): Promise<Count> {
    return this.genCiudadesRepository.count(where);
  }

  @get('/gen-ciudades')
  @response(200, {
    description: 'Array of GenCiudades model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GenCiudades, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GenCiudades) filter?: Filter<GenCiudades>,
  ): Promise<GenCiudades[]> {
    return this.genCiudadesRepository.find(filter);
  }

  @patch('/gen-ciudades')
  @response(200, {
    description: 'GenCiudades PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenCiudades, {partial: true}),
        },
      },
    })
    genCiudades: GenCiudades,
    @param.where(GenCiudades) where?: Where<GenCiudades>,
  ): Promise<Count> {
    return this.genCiudadesRepository.updateAll(genCiudades, where);
  }

  @get('/gen-ciudades/{id}')
  @response(200, {
    description: 'GenCiudades model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GenCiudades, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GenCiudades, {exclude: 'where'}) filter?: FilterExcludingWhere<GenCiudades>
  ): Promise<GenCiudades> {
    return this.genCiudadesRepository.findById(id, filter);
  }

  @patch('/gen-ciudades/{id}')
  @response(204, {
    description: 'GenCiudades PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenCiudades, {partial: true}),
        },
      },
    })
    genCiudades: GenCiudades,
  ): Promise<void> {
    await this.genCiudadesRepository.updateById(id, genCiudades);
  }

  @put('/gen-ciudades/{id}')
  @response(204, {
    description: 'GenCiudades PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() genCiudades: GenCiudades,
  ): Promise<void> {
    await this.genCiudadesRepository.replaceById(id, genCiudades);
  }

  @del('/gen-ciudades/{id}')
  @response(204, {
    description: 'GenCiudades DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.genCiudadesRepository.deleteById(id);
  }
}
