
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
    return this.estadoUsuRepository.FKEstadoUsu(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/estado-usus/{id}/usuarios', {
    responses: {
      '200': {
        description: 'EstadoUsu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoUsu.prototype.IdEstado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInEstadoUsu',
            exclude: ['Id'],
            optional: ['IdEstadoUsu']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'Id'>,
  ): Promise<Usuarios> {
    return this.estadoUsuRepository.FKEstadoUsu(id).create(usuarios);
  }

  @authenticate('TokenStrategy')
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
    return this.estadoUsuRepository.FKEstadoUsu(id).patch(usuarios, where);
  }

  @authenticate('TokenStrategy')
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
    return this.estadoUsuRepository.FKEstadoUsu(id).delete(where);
  }
}
