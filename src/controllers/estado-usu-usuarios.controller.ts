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
  EstadoUsu,
  Usuarios
} from '../models';
import {EstadoUsuRepository} from '../repositories';

export class EstadoUsuUsuariosController {
  constructor(
    @repository(EstadoUsuRepository) protected estadoUsuRepository: EstadoUsuRepository,
  ) { }

  @get('/estado-usus/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of EstadoUsu has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.estadoUsuRepository.FKEstUsu(id).find(filter);
  }

  @post('/estado-usus/{id}/usuarios', {
    responses: {
      '200': {
        description: 'EstadoUsu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoUsu.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInEstadoUsu',
            exclude: ['Id'],
            optional: ['IdEstado']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'Id'>,
  ): Promise<Usuarios> {
    return this.estadoUsuRepository.FKEstUsu(id).create(usuarios);
  }

  @patch('/estado-usus/{id}/usuarios', {
    responses: {
      '200': {
        description: 'EstadoUsu.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.estadoUsuRepository.FKEstUsu(id).patch(usuarios, where);
  }

  @del('/estado-usus/{id}/usuarios', {
    responses: {
      '200': {
        description: 'EstadoUsu.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.estadoUsuRepository.FKEstUsu(id).delete(where);
  }
}
