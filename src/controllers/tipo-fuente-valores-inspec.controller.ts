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
  TipoFuente,
  ValoresInspec,
} from '../models';
import {TipoFuenteRepository} from '../repositories';

export class TipoFuenteValoresInspecController {
  constructor(
    @repository(TipoFuenteRepository) protected tipoFuenteRepository: TipoFuenteRepository,
  ) { }

  @get('/tipo-fuentes/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'Array of TipoFuente has many ValoresInspec',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ValoresInspec)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ValoresInspec>,
  ): Promise<ValoresInspec[]> {
    return this.tipoFuenteRepository.TipoVal(id).find(filter);
  }

  @post('/tipo-fuentes/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'TipoFuente model instance',
        content: {'application/json': {schema: getModelSchemaRef(ValoresInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoFuente.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValoresInspec, {
            title: 'NewValoresInspecInTipoFuente',
            exclude: ['Id'],
            optional: ['IdTipo']
          }),
        },
      },
    }) valoresInspec: Omit<ValoresInspec, 'Id'>,
  ): Promise<ValoresInspec> {
    return this.tipoFuenteRepository.TipoVal(id).create(valoresInspec);
  }

  @patch('/tipo-fuentes/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'TipoFuente.ValoresInspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValoresInspec, {partial: true}),
        },
      },
    })
    valoresInspec: Partial<ValoresInspec>,
    @param.query.object('where', getWhereSchemaFor(ValoresInspec)) where?: Where<ValoresInspec>,
  ): Promise<Count> {
    return this.tipoFuenteRepository.TipoVal(id).patch(valoresInspec, where);
  }

  @del('/tipo-fuentes/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'TipoFuente.ValoresInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ValoresInspec)) where?: Where<ValoresInspec>,
  ): Promise<Count> {
    return this.tipoFuenteRepository.TipoVal(id).delete(where);
  }
}
