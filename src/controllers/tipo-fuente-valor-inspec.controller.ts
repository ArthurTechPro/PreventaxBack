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
  ValorInspec,
} from '../models';
import {TipoFuenteRepository} from '../repositories';

export class TipoFuenteValorInspecController {
  constructor(
    @repository(TipoFuenteRepository) protected tipoFuenteRepository: TipoFuenteRepository,
  ) { }

  @get('/tipo-fuentes/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'Array of TipoFuente has many ValorInspec',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ValorInspec)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ValorInspec>,
  ): Promise<ValorInspec[]> {
    return this.tipoFuenteRepository.KFTipFuente(id).find(filter);
  }

  @post('/tipo-fuentes/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'TipoFuente model instance',
        content: {'application/json': {schema: getModelSchemaRef(ValorInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoFuente.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorInspec, {
            title: 'NewValorInspecInTipoFuente',
            exclude: ['Id'],
            optional: ['IdTipoFuente']
          }),
        },
      },
    }) valorInspec: Omit<ValorInspec, 'Id'>,
  ): Promise<ValorInspec> {
    return this.tipoFuenteRepository.KFTipFuente(id).create(valorInspec);
  }

  @patch('/tipo-fuentes/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'TipoFuente.ValorInspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorInspec, {partial: true}),
        },
      },
    })
    valorInspec: Partial<ValorInspec>,
    @param.query.object('where', getWhereSchemaFor(ValorInspec)) where?: Where<ValorInspec>,
  ): Promise<Count> {
    return this.tipoFuenteRepository.KFTipFuente(id).patch(valorInspec, where);
  }

  @del('/tipo-fuentes/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'TipoFuente.ValorInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ValorInspec)) where?: Where<ValorInspec>,
  ): Promise<Count> {
    return this.tipoFuenteRepository.KFTipFuente(id).delete(where);
  }
}
