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
import {Ciudades} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesController {
  constructor(
    @repository(CiudadesRepository)
    public ciudadesRepository: CiudadesRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/ciudades')
  @response(200, {
    description: 'GenCiudades model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ciudades)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {
            title: 'NewGenCiudades',

          }),
        },
      },
    })
    ciudades: Ciudades,
  ): Promise<Ciudades> {
    return this.ciudadesRepository.create(ciudades);
  }

  @get('/ciudades/count')
  @response(200, {
    description: 'GenCiudades model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ciudades) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.ciudadesRepository.count(where);
  }

  @get('/ciudades')
  @response(200, {
    description: 'Array of GenCiudades model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ciudades, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ciudades) filter?: Filter<Ciudades>,
  ): Promise<Ciudades[]> {
    return this.ciudadesRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/ciudades')
  @response(200, {
    description: 'GenCiudades PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {partial: true}),
        },
      },
    })
    genCiudades: Ciudades,
    @param.where(Ciudades) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.ciudadesRepository.updateAll(genCiudades, where);
  }

  @get('/ciudades/{id}')
  @response(200, {
    description: 'GenCiudades model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ciudades, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ciudades, {exclude: 'where'}) filter?: FilterExcludingWhere<Ciudades>
  ): Promise<Ciudades> {
    return this.ciudadesRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/ciudades/{id}')
  @response(204, {
    description: 'GenCiudades PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {partial: true}),
        },
      },
    })
    ciudades: Ciudades,
  ): Promise<void> {
    await this.ciudadesRepository.updateById(id, ciudades);
  }


  @authenticate('TokenStrategy')
  @put('/ciudades/{id}')
  @response(204, {
    description: 'GenCiudades PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ciudades: Ciudades,
  ): Promise<void> {
    await this.ciudadesRepository.replaceById(id, ciudades);
  }

  @authenticate('TokenStrategy')
  @del('/gen-ciudades/{id}')
  @response(204, {
    description: 'GenCiudades DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ciudadesRepository.deleteById(id);
  }
}
