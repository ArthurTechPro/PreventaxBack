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
  Comentarios, TipoComent
} from '../models';
import {TipoComentRepository} from '../repositories';

export class TipoComentComentariosController {
  constructor(
    @repository(TipoComentRepository) protected tipoComentRepository: TipoComentRepository,
  ) { }

  @get('/tipo-coments/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of TipoComent has many Comentarios',
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
    return this.tipoComentRepository.FKTipComet(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/tipo-coments/{id}/comentarios', {
    responses: {
      '200': {
        description: 'TipoComent model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoComent.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentarios, {
            title: 'NewComentariosInTipoComent',
            exclude: ['Id'],
            optional: ['IdTipoComent']
          }),
        },
      },
    }) comentarios: Omit<Comentarios, 'Id'>,
  ): Promise<Comentarios> {
    return this.tipoComentRepository.FKTipComet(id).create(comentarios);
  }

  @authenticate('TokenStrategy')
  @patch('/tipo-coments/{id}/comentarios', {
    responses: {
      '200': {
        description: 'TipoComent.Comentarios PATCH success count',
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
    return this.tipoComentRepository.FKTipComet(id).patch(comentarios, where);
  }

  @authenticate('TokenStrategy')
  @del('/tipo-coments/{id}/comentarios', {
    responses: {
      '200': {
        description: 'TipoComent.Comentarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comentarios)) where?: Where<Comentarios>,
  ): Promise<Count> {
    return this.tipoComentRepository.FKTipComet(id).delete(where);
  }
}
