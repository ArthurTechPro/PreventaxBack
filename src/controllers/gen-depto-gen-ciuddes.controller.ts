import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  GenDepto,
  GenCiuddes,
} from '../models';
import {GenDeptoRepository} from '../repositories';

export class GenDeptoGenCiuddesController {
  constructor(
    @repository(GenDeptoRepository) protected genDeptoRepository: GenDeptoRepository,
  ) { }

  @get('/gen-deptos/{id}/gen-ciuddes', {
    responses: {
      '200': {
        description: 'Array of GenDepto has many GenCiuddes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GenCiuddes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<GenCiuddes>,
  ): Promise<GenCiuddes[]> {
    return this.genDeptoRepository.FKDepCiu(id).find(filter);
  }

  @post('/gen-deptos/{id}/gen-ciuddes', {
    responses: {
      '200': {
        description: 'GenDepto model instance',
        content: {'application/json': {schema: getModelSchemaRef(GenCiuddes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GenDepto.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenCiuddes, {
            title: 'NewGenCiuddesInGenDepto',
            exclude: ['Codigo'],
            optional: ['IdDepto']
          }),
        },
      },
    }) genCiuddes: Omit<GenCiuddes, 'Codigo'>,
  ): Promise<GenCiuddes> {
    return this.genDeptoRepository.FKDepCiu(id).create(genCiuddes);
  }

  @patch('/gen-deptos/{id}/gen-ciuddes', {
    responses: {
      '200': {
        description: 'GenDepto.GenCiuddes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenCiuddes, {partial: true}),
        },
      },
    })
    genCiuddes: Partial<GenCiuddes>,
    @param.query.object('where', getWhereSchemaFor(GenCiuddes)) where?: Where<GenCiuddes>,
  ): Promise<Count> {
    return this.genDeptoRepository.FKDepCiu(id).patch(genCiuddes, where);
  }

  @del('/gen-deptos/{id}/gen-ciuddes', {
    responses: {
      '200': {
        description: 'GenDepto.GenCiuddes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(GenCiuddes)) where?: Where<GenCiuddes>,
  ): Promise<Count> {
    return this.genDeptoRepository.FKDepCiu(id).delete(where);
  }
}
