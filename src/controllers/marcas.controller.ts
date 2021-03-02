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
import {Marcas} from '../models';
import {MarcasRepository} from '../repositories';

export class MarcasController {
  constructor(
    @repository(MarcasRepository)
    public marcasRepository: MarcasRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/marcas')
  @response(200, {
    description: 'Marcas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Marcas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marcas, {
            title: 'NewMarcas',

          }),
        },
      },
    })
    marcas: Marcas,
  ): Promise<Marcas> {
    return this.marcasRepository.create(marcas);
  }

  @get('/marcas/count')
  @response(200, {
    description: 'Marcas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Marcas) where?: Where<Marcas>,
  ): Promise<Count> {
    return this.marcasRepository.count(where);
  }

  @get('/marcas')
  @response(200, {
    description: 'Array of Marcas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Marcas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Marcas) filter?: Filter<Marcas>,
  ): Promise<Marcas[]> {
    return this.marcasRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/marcas')
  @response(200, {
    description: 'Marcas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marcas, {partial: true}),
        },
      },
    })
    marcas: Marcas,
    @param.where(Marcas) where?: Where<Marcas>,
  ): Promise<Count> {
    return this.marcasRepository.updateAll(marcas, where);
  }

  @get('/marcas/{id}')
  @response(200, {
    description: 'Marcas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Marcas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Marcas, {exclude: 'where'}) filter?: FilterExcludingWhere<Marcas>
  ): Promise<Marcas> {
    return this.marcasRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/marcas/{id}')
  @response(204, {
    description: 'Marcas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marcas, {partial: true}),
        },
      },
    })
    marcas: Marcas,
  ): Promise<void> {
    await this.marcasRepository.updateById(id, marcas);
  }

  @authenticate('TokenStrategy')
  @put('/marcas/{id}')
  @response(204, {
    description: 'Marcas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() marcas: Marcas,
  ): Promise<void> {
    await this.marcasRepository.replaceById(id, marcas);
  }

  @authenticate('TokenStrategy')
  @del('/marcas/{id}')
  @response(204, {
    description: 'Marcas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.marcasRepository.deleteById(id);
  }
}
