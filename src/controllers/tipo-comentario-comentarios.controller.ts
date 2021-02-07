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
  TipoComentario,
  Comentarios,
} from '../models';
import {TipoComentarioRepository} from '../repositories';

export class TipoComentarioComentariosController {
  constructor(
    @repository(TipoComentarioRepository) protected tipoComentarioRepository: TipoComentarioRepository,
  ) { }

  @get('/tipo-comentarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of TipoComentario has many Comentarios',
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
    return this.tipoComentarioRepository.FKTipComent(id).find(filter);
  }

  @post('/tipo-comentarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'TipoComentario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoComentario.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {
            title: 'NewComentariosInTipoComentario',
            exclude: ['Id'],
            optional: ['IdComent']
          }),
        },
      },
    }) comentarios: Omit<Comentarios, 'Id'>,
  ): Promise<Comentarios> {
    return this.tipoComentarioRepository.FKTipComent(id).create(comentarios);
  }

  @patch('/tipo-comentarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'TipoComentario.Comentarios PATCH success count',
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
    return this.tipoComentarioRepository.FKTipComent(id).patch(comentarios, where);
  }

  @del('/tipo-comentarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'TipoComentario.Comentarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comentarios)) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.tipoComentarioRepository.FKTipComent(id).delete(where);
  }
}
