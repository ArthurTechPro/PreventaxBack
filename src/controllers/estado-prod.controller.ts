
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
import {EstadoProd} from '../models';
import {EstadoProdRepository} from '../repositories';

export class EstadoProdController {
  constructor(
    @repository(EstadoProdRepository)
    public estadoProdRepository: EstadoProdRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/estado-prods')
  @response(200, {
    description: 'EstadoProd model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoProd)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoProd, {
            title: 'NewEstadoProd',
            exclude: ['Id'],
          }),
        },
      },
    })
    estadoProd: Omit<EstadoProd, 'Id'>,
  ): Promise<EstadoProd> {
    return this.estadoProdRepository.create(estadoProd);
  }

  @get('/estado-prods/count')
  @response(200, {
    description: 'EstadoProd model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoProd) where?: Where<EstadoProd>,
  ): Promise<Count> {
    return this.estadoProdRepository.count(where);
  }

  @get('/estado-prods')
  @response(200, {
    description: 'Array of EstadoProd model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoProd, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoProd) filter?: Filter<EstadoProd>,
  ): Promise<EstadoProd[]> {
    return this.estadoProdRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/estado-prods')
  @response(200, {
    description: 'EstadoProd PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoProd, {partial: true}),
        },
      },
    })
    estadoProd: EstadoProd,
    @param.where(EstadoProd) where?: Where<EstadoProd>,
  ): Promise<Count> {
    return this.estadoProdRepository.updateAll(estadoProd, where);
  }

  @get('/estado-prods/{id}')
  @response(200, {
    description: 'EstadoProd model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoProd, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoProd, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoProd>
  ): Promise<EstadoProd> {
    return this.estadoProdRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/estado-prods/{id}')
  @response(204, {
    description: 'EstadoProd PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoProd, {partial: true}),
        },
      },
    })
    estadoProd: EstadoProd,
  ): Promise<void> {
    await this.estadoProdRepository.updateById(id, estadoProd);
  }

  @authenticate('TokenStrategy')
  @put('/estado-prods/{id}')
  @response(204, {
    description: 'EstadoProd PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoProd: EstadoProd,
  ): Promise<void> {
    await this.estadoProdRepository.replaceById(id, estadoProd);
  }

  @authenticate('TokenStrategy')
  @del('/estado-prods/{id}')
  @response(204, {
    description: 'EstadoProd DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoProdRepository.deleteById(id);
  }
}
