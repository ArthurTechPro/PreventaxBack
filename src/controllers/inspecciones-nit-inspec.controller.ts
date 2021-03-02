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
  Inspecciones,
  NitInspec
} from '../models';
import {InspeccionesRepository} from '../repositories';

export class InspeccionesNitInspecController {
  constructor(
    @repository(InspeccionesRepository) protected inspeccionesRepository: InspeccionesRepository,
  ) { }

  @get('/inspecciones/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Array of Inspecciones has many NitInspec',
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
    return this.inspeccionesRepository.FKInpecNits(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/inspecciones/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(NitInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inspecciones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NitInspec, {
            title: 'NewNitInspecInInspecciones',
            exclude: ['Id'],
            optional: ['IdInspec']
          }),
        },
      },
    }) nitInspec: Omit<NitInspec, 'Id'>,
  ): Promise<NitInspec> {
    return this.inspeccionesRepository.FKInpecNits(id).create(nitInspec);
  }

  @authenticate('TokenStrategy')
  @patch('/inspecciones/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.NitInspec PATCH success count',
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
    return this.inspeccionesRepository.FKInpecNits(id).patch(nitInspec, where);
  }

  @authenticate('TokenStrategy')
  @del('/inspecciones/{id}/nit-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.NitInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(NitInspec)) where?: Where<NitInspec>,
  ): Promise<Count> {
    return this.inspeccionesRepository.FKInpecNits(id).delete(where);
  }
}
