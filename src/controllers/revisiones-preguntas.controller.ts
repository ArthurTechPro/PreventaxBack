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
  Revisiones,
  Preguntas,
} from '../models';
import {RevisionesRepository} from '../repositories';

export class RevisionesPreguntasController {
  constructor(
    @repository(RevisionesRepository) protected revisionesRepository: RevisionesRepository,
  ) { }

  @get('/revisiones/{id}/preguntas', {
    responses: {
      '200': {
        description: 'Array of Revisiones has many Preguntas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Preguntas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Preguntas>,
  ): Promise<Preguntas[]> {
    return this.revisionesRepository.FKRevisPregunta(id).find(filter);
  }

  @post('/revisiones/{id}/preguntas', {
    responses: {
      '200': {
        description: 'Revisiones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Preguntas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Revisiones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntas, {
            title: 'NewPreguntasInRevisiones',
            exclude: ['Id'],
            optional: ['IdRevision']
          }),
        },
      },
    }) preguntas: Omit<Preguntas, 'Id'>,
  ): Promise<Preguntas> {
    return this.revisionesRepository.FKRevisPregunta(id).create(preguntas);
  }

  @patch('/revisiones/{id}/preguntas', {
    responses: {
      '200': {
        description: 'Revisiones.Preguntas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntas, {partial: true}),
        },
      },
    })
    preguntas: Partial<Preguntas>,
    @param.query.object('where', getWhereSchemaFor(Preguntas)) where?: Where<Preguntas>,
  ): Promise<Count> {
    return this.revisionesRepository.FKRevisPregunta(id).patch(preguntas, where);
  }

  @del('/revisiones/{id}/preguntas', {
    responses: {
      '200': {
        description: 'Revisiones.Preguntas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Preguntas)) where?: Where<Preguntas>,
  ): Promise<Count> {
    return this.revisionesRepository.FKRevisPregunta(id).delete(where);
  }
}
