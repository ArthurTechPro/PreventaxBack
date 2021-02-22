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
import {FotoInspec} from '../models';
import {FotoInspecRepository} from '../repositories';

export class FotoInspecController {
  constructor(
    @repository(FotoInspecRepository)
    public fotoInspecRepository : FotoInspecRepository,
  ) {}

  @post('/foto-inspecs')
  @response(200, {
    description: 'FotoInspec model instance',
    content: {'application/json': {schema: getModelSchemaRef(FotoInspec)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {
            title: 'NewFotoInspec',
            exclude: ['Id'],
          }),
        },
      },
    })
    fotoInspec: Omit<FotoInspec, 'Id'>,
  ): Promise<FotoInspec> {
    return this.fotoInspecRepository.create(fotoInspec);
  }

  @get('/foto-inspecs/count')
  @response(200, {
    description: 'FotoInspec model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FotoInspec) where?: Where<FotoInspec>,
  ): Promise<Count> {
    return this.fotoInspecRepository.count(where);
  }

  @get('/foto-inspecs')
  @response(200, {
    description: 'Array of FotoInspec model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FotoInspec, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FotoInspec) filter?: Filter<FotoInspec>,
  ): Promise<FotoInspec[]> {
    return this.fotoInspecRepository.find(filter);
  }

  @patch('/foto-inspecs')
  @response(200, {
    description: 'FotoInspec PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {partial: true}),
        },
      },
    })
    fotoInspec: FotoInspec,
    @param.where(FotoInspec) where?: Where<FotoInspec>,
  ): Promise<Count> {
    return this.fotoInspecRepository.updateAll(fotoInspec, where);
  }

  @get('/foto-inspecs/{id}')
  @response(200, {
    description: 'FotoInspec model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FotoInspec, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(FotoInspec, {exclude: 'where'}) filter?: FilterExcludingWhere<FotoInspec>
  ): Promise<FotoInspec> {
    return this.fotoInspecRepository.findById(id, filter);
  }

  @patch('/foto-inspecs/{id}')
  @response(204, {
    description: 'FotoInspec PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {partial: true}),
        },
      },
    })
    fotoInspec: FotoInspec,
  ): Promise<void> {
    await this.fotoInspecRepository.updateById(id, fotoInspec);
  }

  @put('/foto-inspecs/{id}')
  @response(204, {
    description: 'FotoInspec PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() fotoInspec: FotoInspec,
  ): Promise<void> {
    await this.fotoInspecRepository.replaceById(id, fotoInspec);
  }

  @del('/foto-inspecs/{id}')
  @response(204, {
    description: 'FotoInspec DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.fotoInspecRepository.deleteById(id);
  }
}
