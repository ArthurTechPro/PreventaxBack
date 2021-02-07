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
  Rolles,
  Usuarios,
} from '../models';
import {RollesRepository} from '../repositories';

export class RollesUsuariosController {
  constructor(
    @repository(RollesRepository) protected rollesRepository: RollesRepository,
  ) { }

  @get('/rolles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Rolles has many Usuarios',
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
    return this.rollesRepository.FKRollUsu(id).find(filter);
  }

  @post('/rolles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rolles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rolles.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInRolles',
            exclude: ['Id'],
            optional: ['IdRoll']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'Id'>,
  ): Promise<Usuarios> {
    return this.rollesRepository.FKRollUsu(id).create(usuarios);
  }

  @patch('/rolles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rolles.Usuarios PATCH success count',
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
    return this.rollesRepository.FKRollUsu(id).patch(usuarios, where);
  }

  @del('/rolles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rolles.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.rollesRepository.FKRollUsu(id).delete(where);
  }
}
