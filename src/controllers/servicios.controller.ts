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
import {Servicios} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository: ServiciosRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/servicios')
  @response(200, {
    description: 'Servicios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Servicios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {
            title: 'NewServicios',

          }),
        },
      },
    })
    servicios: Servicios,
  ): Promise<Servicios> {
    return this.serviciosRepository.create(servicios);
  }

  @get('/servicios/count')
  @response(200, {
    description: 'Servicios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Servicios) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.serviciosRepository.count(where);
  }

  @get('/servicios')
  @response(200, {
    description: 'Array of Servicios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Servicios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Servicios) filter?: Filter<Servicios>,
  ): Promise<Servicios[]> {
    return this.serviciosRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/servicios')
  @response(200, {
    description: 'Servicios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {partial: true}),
        },
      },
    })
    servicios: Servicios,
    @param.where(Servicios) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.serviciosRepository.updateAll(servicios, where);
  }

  @get('/servicios/{id}')
  @response(200, {
    description: 'Servicios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Servicios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Servicios, {exclude: 'where'}) filter?: FilterExcludingWhere<Servicios>
  ): Promise<Servicios> {
    return this.serviciosRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/servicios/{id}')
  @response(204, {
    description: 'Servicios PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {partial: true}),
        },
      },
    })
    servicios: Servicios,
  ): Promise<void> {
    await this.serviciosRepository.updateById(id, servicios);
  }

  @authenticate('TokenStrategy')
  @put('/servicios/{id}')
  @response(204, {
    description: 'Servicios PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servicios: Servicios,
  ): Promise<void> {
    await this.serviciosRepository.replaceById(id, servicios);
  }

  @authenticate('TokenStrategy')
  @del('/servicios/{id}')
  @response(204, {
    description: 'Servicios DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.serviciosRepository.deleteById(id);
  }
}
