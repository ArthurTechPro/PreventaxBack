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
import {VehServicio} from '../models';
import {VehServicioRepository} from '../repositories';

export class VehServicioController {
  constructor(
    @repository(VehServicioRepository)
    public vehServicioRepository : VehServicioRepository,
  ) {}

  @post('/veh-servicios')
  @response(200, {
    description: 'VehServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(VehServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehServicio, {
            title: 'NewVehServicio',
            
          }),
        },
      },
    })
    vehServicio: VehServicio,
  ): Promise<VehServicio> {
    return this.vehServicioRepository.create(vehServicio);
  }

  @get('/veh-servicios/count')
  @response(200, {
    description: 'VehServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VehServicio) where?: Where<VehServicio>,
  ): Promise<Count> {
    return this.vehServicioRepository.count(where);
  }

  @get('/veh-servicios')
  @response(200, {
    description: 'Array of VehServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VehServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VehServicio) filter?: Filter<VehServicio>,
  ): Promise<VehServicio[]> {
    return this.vehServicioRepository.find(filter);
  }

  @patch('/veh-servicios')
  @response(200, {
    description: 'VehServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehServicio, {partial: true}),
        },
      },
    })
    vehServicio: VehServicio,
    @param.where(VehServicio) where?: Where<VehServicio>,
  ): Promise<Count> {
    return this.vehServicioRepository.updateAll(vehServicio, where);
  }

  @get('/veh-servicios/{id}')
  @response(200, {
    description: 'VehServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VehServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VehServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<VehServicio>
  ): Promise<VehServicio> {
    return this.vehServicioRepository.findById(id, filter);
  }

  @patch('/veh-servicios/{id}')
  @response(204, {
    description: 'VehServicio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehServicio, {partial: true}),
        },
      },
    })
    vehServicio: VehServicio,
  ): Promise<void> {
    await this.vehServicioRepository.updateById(id, vehServicio);
  }

  @put('/veh-servicios/{id}')
  @response(204, {
    description: 'VehServicio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vehServicio: VehServicio,
  ): Promise<void> {
    await this.vehServicioRepository.replaceById(id, vehServicio);
  }

  @del('/veh-servicios/{id}')
  @response(204, {
    description: 'VehServicio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vehServicioRepository.deleteById(id);
  }
}
