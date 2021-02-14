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
import {VehMarca} from '../models';
import {VehMarcaRepository} from '../repositories';

export class VehMarcaController {
  constructor(
    @repository(VehMarcaRepository)
    public vehMarcaRepository : VehMarcaRepository,
  ) {}

  @post('/veh-marcas')
  @response(200, {
    description: 'VehMarca model instance',
    content: {'application/json': {schema: getModelSchemaRef(VehMarca)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehMarca, {
            title: 'NewVehMarca',
            
          }),
        },
      },
    })
    vehMarca: VehMarca,
  ): Promise<VehMarca> {
    return this.vehMarcaRepository.create(vehMarca);
  }

  @get('/veh-marcas/count')
  @response(200, {
    description: 'VehMarca model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VehMarca) where?: Where<VehMarca>,
  ): Promise<Count> {
    return this.vehMarcaRepository.count(where);
  }

  @get('/veh-marcas')
  @response(200, {
    description: 'Array of VehMarca model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VehMarca, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VehMarca) filter?: Filter<VehMarca>,
  ): Promise<VehMarca[]> {
    return this.vehMarcaRepository.find(filter);
  }

  @patch('/veh-marcas')
  @response(200, {
    description: 'VehMarca PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehMarca, {partial: true}),
        },
      },
    })
    vehMarca: VehMarca,
    @param.where(VehMarca) where?: Where<VehMarca>,
  ): Promise<Count> {
    return this.vehMarcaRepository.updateAll(vehMarca, where);
  }

  @get('/veh-marcas/{id}')
  @response(200, {
    description: 'VehMarca model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VehMarca, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VehMarca, {exclude: 'where'}) filter?: FilterExcludingWhere<VehMarca>
  ): Promise<VehMarca> {
    return this.vehMarcaRepository.findById(id, filter);
  }

  @patch('/veh-marcas/{id}')
  @response(204, {
    description: 'VehMarca PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VehMarca, {partial: true}),
        },
      },
    })
    vehMarca: VehMarca,
  ): Promise<void> {
    await this.vehMarcaRepository.updateById(id, vehMarca);
  }

  @put('/veh-marcas/{id}')
  @response(204, {
    description: 'VehMarca PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vehMarca: VehMarca,
  ): Promise<void> {
    await this.vehMarcaRepository.replaceById(id, vehMarca);
  }

  @del('/veh-marcas/{id}')
  @response(204, {
    description: 'VehMarca DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vehMarcaRepository.deleteById(id);
  }
}
