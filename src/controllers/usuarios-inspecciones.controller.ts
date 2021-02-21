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
  Inspecciones, Usuarios
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosInspeccionesController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Inspecciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inspecciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inspecciones>,
  ): Promise<Inspecciones[]> {
    return this.usuariosRepository.FKUsuInspec(id).find(filter);
  }

  @post('/usuarios/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inspecciones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuarios.prototype.IdUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {
            title: 'NewInspeccionesInUsuarios',
            exclude: ['Id'],
            optional: ['IdUsuario']
          }),
        },
      },
    }) inspecciones: Omit<Inspecciones, 'Id'>,
  ): Promise<Inspecciones> {
    return this.usuariosRepository.FKUsuInspec(id).create(inspecciones);
  }

  @patch('/usuarios/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Usuarios.Inspecciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {partial: true}),
        },
      },
    })
    inspecciones: Partial<Inspecciones>,
    @param.query.object('where', getWhereSchemaFor(Inspecciones)) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.usuariosRepository.FKUsuInspec(id).patch(inspecciones, where);
  }

  @del('/usuarios/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Usuarios.Inspecciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inspecciones)) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.usuariosRepository.FKUsuInspec(id).delete(where);
  }
}
