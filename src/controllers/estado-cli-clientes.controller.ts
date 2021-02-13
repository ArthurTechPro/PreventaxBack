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
  EstadoCli,
  Clientes,
} from '../models';
import {EstadoCliRepository} from '../repositories';

export class EstadoCliClientesController {
  constructor(
    @repository(EstadoCliRepository) protected estadoCliRepository: EstadoCliRepository,
  ) { }

  @get('/estado-clis/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of EstadoCli has many Clientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Clientes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.estadoCliRepository.EstCli(id).find(filter);
  }

  @post('/estado-clis/{id}/clientes', {
    responses: {
      '200': {
        description: 'EstadoCli model instance',
        content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoCli.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientesInEstadoCli',
            exclude: ['Id'],
            optional: ['IdEstado']
          }),
        },
      },
    }) clientes: Omit<Clientes, 'Id'>,
  ): Promise<Clientes> {
    return this.estadoCliRepository.EstCli(id).create(clientes);
  }

  @patch('/estado-clis/{id}/clientes', {
    responses: {
      '200': {
        description: 'EstadoCli.Clientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Partial<Clientes>,
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.estadoCliRepository.EstCli(id).patch(clientes, where);
  }

  @del('/estado-clis/{id}/clientes', {
    responses: {
      '200': {
        description: 'EstadoCli.Clientes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.estadoCliRepository.EstCli(id).delete(where);
  }
}
