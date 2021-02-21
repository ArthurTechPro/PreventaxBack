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
import {TipoDoc} from '../models';
import {TipoDocRepository} from '../repositories';

export class TipoDocController {
  constructor(
    @repository(TipoDocRepository)
    public tipoDocRepository: TipoDocRepository,
  ) { }

  @post('/tipo-docs')
  @response(200, {
    description: 'TipoDoc model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoDoc)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDoc, {
            title: 'NewTipoDoc',
            exclude: ['Id'],
          }),
        },
      },
    })
    tipoDoc: Omit<TipoDoc, 'Id'>,
  ): Promise<TipoDoc> {
    return this.tipoDocRepository.create(tipoDoc);
  }

  @get('/tipo-docs/count')
  @response(200, {
    description: 'TipoDoc model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoDoc) where?: Where<TipoDoc>,
  ): Promise<Count> {
    return this.tipoDocRepository.count(where);
  }

  @get('/tipo-docs')
  @response(200, {
    description: 'Array of TipoDoc model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoDoc, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoDoc) filter?: Filter<TipoDoc>,
  ): Promise<TipoDoc[]> {
    return this.tipoDocRepository.find(filter);
  }

  @patch('/tipo-docs')
  @response(200, {
    description: 'TipoDoc PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDoc, {partial: true}),
        },
      },
    })
    tipoDoc: TipoDoc,
    @param.where(TipoDoc) where?: Where<TipoDoc>,
  ): Promise<Count> {
    return this.tipoDocRepository.updateAll(tipoDoc, where);
  }

  @get('/tipo-docs/{id}')
  @response(200, {
    description: 'TipoDoc model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoDoc, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoDoc, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoDoc>
  ): Promise<TipoDoc> {
    return this.tipoDocRepository.findById(id, filter);
  }

  @patch('/tipo-docs/{id}')
  @response(204, {
    description: 'TipoDoc PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDoc, {partial: true}),
        },
      },
    })
    tipoDoc: TipoDoc,
  ): Promise<void> {
    await this.tipoDocRepository.updateById(id, tipoDoc);
  }

  @put('/tipo-docs/{id}')
  @response(204, {
    description: 'TipoDoc PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoDoc: TipoDoc,
  ): Promise<void> {
    await this.tipoDocRepository.replaceById(id, tipoDoc);
  }

  @del('/tipo-docs/{id}')
  @response(204, {
    description: 'TipoDoc DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoDocRepository.deleteById(id);
  }
}
