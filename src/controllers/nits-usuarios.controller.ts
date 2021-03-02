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
  Nits,
  Usuarios
} from '../models';
import {NitsRepository} from '../repositories';

export class NitsUsuariosController {
  constructor(
    @repository(NitsRepository) protected nitsRepository: NitsRepository,
  ) { }

  @get('/nits/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Nits has many Usuarios',
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
    return this.nitsRepository.KFNitUsuario(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/nits/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Nits model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Nits.prototype.Nit,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInNits',
            exclude: ['Id'],
            optional: ['IdNit']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'Id'>,
  ): Promise<Usuarios> {
    return this.nitsRepository.KFNitUsuario(id).create(usuarios);
  }

  @authenticate('TokenStrategy')
  @patch('/nits/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Nits.Usuarios PATCH success count',
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
    return this.nitsRepository.KFNitUsuario(id).patch(usuarios, where);
  }

  @authenticate('TokenStrategy')
  @del('/nits/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Nits.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.nitsRepository.KFNitUsuario(id).delete(where);
  }
}
