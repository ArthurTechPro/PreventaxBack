
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
  NitInspec, TnitInspec
} from '../models';
import {TnitInspecRepository} from '../repositories';

export class TnitInspecNitInspecController {
  constructor(
    @repository(TnitInspecRepository) protected tnitInspecRepository: TnitInspecRepository,
  ) { }

  @get('/tnit-inspecs/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Array of TnitInspec has many NitInspec',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(NitInspec)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<NitInspec>,
  ): Promise<NitInspec[]> {
    return this.tnitInspecRepository.FKTipoNit(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/tnit-inspecs/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'TnitInspec model instance',
        content: {'application/json': {schema: getModelSchemaRef(NitInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TnitInspec.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NitInspec, {
            title: 'NewNitInspecInTnitInspec',
            exclude: ['Id'],
            optional: ['IdTipoNit']
          }),
        },
      },
    }) nitInspec: Omit<NitInspec, 'Id'>,
  ): Promise<NitInspec> {
    return this.tnitInspecRepository.FKTipoNit(id).create(nitInspec);
  }

  @authenticate('TokenStrategy')
  @patch('/tnit-inspecs/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'TnitInspec.NitInspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NitInspec, {partial: true}),
        },
      },
    })
    nitInspec: Partial<NitInspec>,
    @param.query.object('where', getWhereSchemaFor(NitInspec)) where?: Where<NitInspec>,
  ): Promise<Count> {
    return this.tnitInspecRepository.FKTipoNit(id).patch(nitInspec, where);
  }

  @authenticate('TokenStrategy')
  @del('/tnit-inspecs/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'TnitInspec.NitInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(NitInspec)) where?: Where<NitInspec>,
  ): Promise<Count> {
    return this.tnitInspecRepository.FKTipoNit(id).delete(where);
  }
}
