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
  ValorInspec
} from '../models';
import {InspeccionesRepository} from '../repositories';

export class InspeccionesValorInspecController {
  constructor(
    @repository(InspeccionesRepository) protected inspeccionesRepository: InspeccionesRepository,
  ) { }

  @get('/inspecciones/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'Array of Inspecciones has many ValorInspec',
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
    return this.inspeccionesRepository.FKInspecValor(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/inspecciones/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(ValorInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inspecciones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValorInspec, {
            title: 'NewValorInspecInInspecciones',
            exclude: ['Id'],
            optional: ['IdInspec']
          }),
        },
      },
    }) valorInspec: Omit<ValorInspec, 'Id'>,
  ): Promise<ValorInspec> {
    return this.inspeccionesRepository.FKInspecValor(id).create(valorInspec);
  }

  @authenticate('TokenStrategy')
  @patch('/inspecciones/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.ValorInspec PATCH success count',
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
    return this.inspeccionesRepository.FKInspecValor(id).patch(valorInspec, where);
  }

  @authenticate('TokenStrategy')
  @del('/inspecciones/{id}/valor-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.ValorInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ValorInspec)) where?: Where<ValorInspec>,
  ): Promise<Count> {
    return this.inspeccionesRepository.FKInspecValor(id).delete(where);
  }
}
