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
import {VehClase} from '../models';
import {VehClaseRepository} from '../repositories';

export class VehClasesController {
  constructor(
    @repository(VehClaseRepository)
    public vehClaseRepository : VehClaseRepository,
  ) {}

  @post('/veh-clases')
  @response(200, {
    description: 'VehClase model instance',
    content: {'application/json': {schema: getModelSchemaRef(VehClase)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehClase, {
            title: 'NewVehClase',
            
          }),
        },
      },
    })
    vehClase: VehClase,
  ): Promise<VehClase> {
    return this.vehClaseRepository.create(vehClase);
  }

  @get('/veh-clases/count')
  @response(200, {
    description: 'VehClase model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VehClase) where?: Where<VehClase>,
  ): Promise<Count> {
    return this.vehClaseRepository.count(where);
  }

  @get('/veh-clases')
  @response(200, {
    description: 'Array of VehClase model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VehClase, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VehClase) filter?: Filter<VehClase>,
  ): Promise<VehClase[]> {
    return this.vehClaseRepository.find(filter);
  }

  @patch('/veh-clases')
  @response(200, {
    description: 'VehClase PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehClase, {partial: true}),
        },
      },
    })
    vehClase: VehClase,
    @param.where(VehClase) where?: Where<VehClase>,
  ): Promise<Count> {
    return this.vehClaseRepository.updateAll(vehClase, where);
  }

  @get('/veh-clases/{id}')
  @response(200, {
    description: 'VehClase model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VehClase, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VehClase, {exclude: 'where'}) filter?: FilterExcludingWhere<VehClase>
  ): Promise<VehClase> {
    return this.vehClaseRepository.findById(id, filter);
  }

  @patch('/veh-clases/{id}')
  @response(204, {
    description: 'VehClase PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehClase, {partial: true}),
        },
      },
    })
    vehClase: VehClase,
  ): Promise<void> {
    await this.vehClaseRepository.updateById(id, vehClase);
  }

  @put('/veh-clases/{id}')
  @response(204, {
    description: 'VehClase PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vehClase: VehClase,
  ): Promise<void> {
    await this.vehClaseRepository.replaceById(id, vehClase);
  }

  @del('/veh-clases/{id}')
  @response(204, {
    description: 'VehClase DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vehClaseRepository.deleteById(id);
  }
}
