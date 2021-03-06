import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Nits, TipoDoc
} from '../models';
import {TipoDocRepository} from '../repositories';

export class TipoDocNitsController {
  constructor(
    @repository(TipoDocRepository) protected tipoDocRepository: TipoDocRepository,
  ) { }

  @get('/tipo-docs/{id}/nits', {
    responses: {
      '200': {
        description: 'Array of TipoDoc has many Nits',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Nits)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Nits>,
  ): Promise<Nits[]> {
    return this.tipoDocRepository.FKTipoDocNIt(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/tipo-docs/{id}/nits', {
    responses: {
      '200': {
        description: 'TipoDoc model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nits)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoDoc.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {
            title: 'NewNitsInTipoDoc',
            exclude: ['Nit'],
            optional: ['IdTipoDoc']
          }),
        },
      },
    }) nits: Omit<Nits, 'Nit'>,
  ): Promise<Nits> {
    return this.tipoDocRepository.FKTipoDocNIt(id).create(nits);
  }

  @authenticate('TokenStrategy')
  @patch('/tipo-docs/{id}/nits', {
    responses: {
      '200': {
        description: 'TipoDoc.Nits PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {partial: true}),
        },
      },
    })
    nits: Partial<Nits>,
    @param.query.object('where', getWhereSchemaFor(Nits)) where?: Where<Nits>,
  ): Promise<Count> {
    return this.tipoDocRepository.FKTipoDocNIt(id).patch(nits, where);
  }

  @authenticate('TokenStrategy')
  @del('/tipo-docs/{id}/nits', {
    responses: {
      '200': {
        description: 'TipoDoc.Nits DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Nits)) where?: Where<Nits>,
  ): Promise<Count> {
    return this.tipoDocRepository.FKTipoDocNIt(id).delete(where);
  }
}
