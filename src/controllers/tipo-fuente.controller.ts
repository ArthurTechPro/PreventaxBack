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
import {TipoFuente} from '../models';
import {TipoFuenteRepository} from '../repositories';

export class TipoFuenteController {
  constructor(
    @repository(TipoFuenteRepository)
    public tipoFuenteRepository: TipoFuenteRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/tipo-fuentes')
  @response(200, {
    description: 'TipoFuente model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoFuente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoFuente, {
            title: 'NewTipoFuente',
            exclude: ['Id'],
          }),
        },
      },
    })
    tipoFuente: Omit<TipoFuente, 'Id'>,
  ): Promise<TipoFuente> {
    return this.tipoFuenteRepository.create(tipoFuente);
  }

  @authenticate('TokenStrategy')
  @get('/tipo-fuentes/count')
  @response(200, {
    description: 'TipoFuente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoFuente) where?: Where<TipoFuente>,
  ): Promise<Count> {
    return this.tipoFuenteRepository.count(where);
  }


  @get('/tipo-fuentes')
  @response(200, {
    description: 'Array of TipoFuente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoFuente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoFuente) filter?: Filter<TipoFuente>,
  ): Promise<TipoFuente[]> {
    return this.tipoFuenteRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/tipo-fuentes')
  @response(200, {
    description: 'TipoFuente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoFuente, {partial: true}),
        },
      },
    })
    tipoFuente: TipoFuente,
    @param.where(TipoFuente) where?: Where<TipoFuente>,
  ): Promise<Count> {
    return this.tipoFuenteRepository.updateAll(tipoFuente, where);
  }

  @get('/tipo-fuentes/{id}')
  @response(200, {
    description: 'TipoFuente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoFuente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoFuente, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoFuente>
  ): Promise<TipoFuente> {
    return this.tipoFuenteRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/tipo-fuentes/{id}')
  @response(204, {
    description: 'TipoFuente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoFuente, {partial: true}),
        },
      },
    })
    tipoFuente: TipoFuente,
  ): Promise<void> {
    await this.tipoFuenteRepository.updateById(id, tipoFuente);
  }

  @authenticate('TokenStrategy')
  @put('/tipo-fuentes/{id}')
  @response(204, {
    description: 'TipoFuente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoFuente: TipoFuente,
  ): Promise<void> {
    await this.tipoFuenteRepository.replaceById(id, tipoFuente);
  }

  @authenticate('TokenStrategy')
  @del('/tipo-fuentes/{id}')
  @response(204, {
    description: 'TipoFuente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoFuenteRepository.deleteById(id);
  }
}
