
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
import {TipoComent} from '../models';
import {TipoComentRepository} from '../repositories';

export class TipoComentController {
  constructor(
    @repository(TipoComentRepository)
    public tipoComentRepository: TipoComentRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/tipo-coments')
  @response(200, {
    description: 'TipoComent model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoComent)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComent, {
            title: 'NewTipoComent',
            exclude: ['Id'],
          }),
        },
      },
    })
    tipoComent: Omit<TipoComent, 'Id'>,
  ): Promise<TipoComent> {
    return this.tipoComentRepository.create(tipoComent);
  }

  @get('/tipo-coments/count')
  @response(200, {
    description: 'TipoComent model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoComent) where?: Where<TipoComent>,
  ): Promise<Count> {
    return this.tipoComentRepository.count(where);
  }

  @get('/tipo-coments')
  @response(200, {
    description: 'Array of TipoComent model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoComent, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoComent) filter?: Filter<TipoComent>,
  ): Promise<TipoComent[]> {
    return this.tipoComentRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/tipo-coments')
  @response(200, {
    description: 'TipoComent PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComent, {partial: true}),
        },
      },
    })
    tipoComent: TipoComent,
    @param.where(TipoComent) where?: Where<TipoComent>,
  ): Promise<Count> {
    return this.tipoComentRepository.updateAll(tipoComent, where);
  }

  @get('/tipo-coments/{id}')
  @response(200, {
    description: 'TipoComent model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoComent, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoComent, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoComent>
  ): Promise<TipoComent> {
    return this.tipoComentRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/tipo-coments/{id}')
  @response(204, {
    description: 'TipoComent PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoComent, {partial: true}),
        },
      },
    })
    tipoComent: TipoComent,
  ): Promise<void> {
    await this.tipoComentRepository.updateById(id, tipoComent);
  }

  @authenticate('TokenStrategy')
  @put('/tipo-coments/{id}')
  @response(204, {
    description: 'TipoComent PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoComent: TipoComent,
  ): Promise<void> {
    await this.tipoComentRepository.replaceById(id, tipoComent);
  }

  @authenticate('TokenStrategy')
  @del('/tipo-coments/{id}')
  @response(204, {
    description: 'TipoComent DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoComentRepository.deleteById(id);
  }
}
