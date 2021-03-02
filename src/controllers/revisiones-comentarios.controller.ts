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
  Comentarios, Revisiones
} from '../models';
import {RevisionesRepository} from '../repositories';

export class RevisionesComentariosController {
  constructor(
    @repository(RevisionesRepository) protected revisionesRepository: RevisionesRepository,
  ) { }

  @get('/revisiones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Revisiones has many Comentarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comentarios>,
  ): Promise<Comentarios[]> {
    return this.revisionesRepository.FKRevisionComet(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/revisiones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Revisiones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Revisiones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {
            title: 'NewComentariosInRevisiones',
            exclude: ['Id'],
            optional: ['IdRevision']
          }),
        },
      },
    }) comentarios: Omit<Comentarios, 'Id'>,
  ): Promise<Comentarios> {
    return this.revisionesRepository.FKRevisionComet(id).create(comentarios);
  }

  @authenticate('TokenStrategy')
  @patch('/revisiones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Revisiones.Comentarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {partial: true}),
        },
      },
    })
    comentarios: Partial<Comentarios>,
    @param.query.object('where', getWhereSchemaFor(Comentarios)) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.revisionesRepository.FKRevisionComet(id).patch(comentarios, where);
  }

  @authenticate('TokenStrategy')
  @del('/revisiones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Revisiones.Comentarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comentarios)) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.revisionesRepository.FKRevisionComet(id).delete(where);
  }
}
