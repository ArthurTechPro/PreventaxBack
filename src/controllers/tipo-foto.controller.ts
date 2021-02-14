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
import {TipoFoto} from '../models';
import {TipoFotoRepository} from '../repositories';

export class TipoFotoController {
  constructor(
    @repository(TipoFotoRepository)
    public tipoFotoRepository : TipoFotoRepository,
  ) {}

  @post('/tipo-fotos')
  @response(200, {
    description: 'TipoFoto model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoFoto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoFoto, {
            title: 'NewTipoFoto',
            exclude: ['Id'],
          }),
        },
      },
    })
    tipoFoto: Omit<TipoFoto, 'Id'>,
  ): Promise<TipoFoto> {
    return this.tipoFotoRepository.create(tipoFoto);
  }

  @get('/tipo-fotos/count')
  @response(200, {
    description: 'TipoFoto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoFoto) where?: Where<TipoFoto>,
  ): Promise<Count> {
    return this.tipoFotoRepository.count(where);
  }

  @get('/tipo-fotos')
  @response(200, {
    description: 'Array of TipoFoto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoFoto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoFoto) filter?: Filter<TipoFoto>,
  ): Promise<TipoFoto[]> {
    return this.tipoFotoRepository.find(filter);
  }

  @patch('/tipo-fotos')
  @response(200, {
    description: 'TipoFoto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoFoto, {partial: true}),
        },
      },
    })
    tipoFoto: TipoFoto,
    @param.where(TipoFoto) where?: Where<TipoFoto>,
  ): Promise<Count> {
    return this.tipoFotoRepository.updateAll(tipoFoto, where);
  }

  @get('/tipo-fotos/{id}')
  @response(200, {
    description: 'TipoFoto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoFoto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoFoto, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoFoto>
  ): Promise<TipoFoto> {
    return this.tipoFotoRepository.findById(id, filter);
  }

  @patch('/tipo-fotos/{id}')
  @response(204, {
    description: 'TipoFoto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoFoto, {partial: true}),
        },
      },
    })
    tipoFoto: TipoFoto,
  ): Promise<void> {
    await this.tipoFotoRepository.updateById(id, tipoFoto);
  }

  @put('/tipo-fotos/{id}')
  @response(204, {
    description: 'TipoFoto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoFoto: TipoFoto,
  ): Promise<void> {
    await this.tipoFotoRepository.replaceById(id, tipoFoto);
  }

  @del('/tipo-fotos/{id}')
  @response(204, {
    description: 'TipoFoto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoFotoRepository.deleteById(id);
  }
}
