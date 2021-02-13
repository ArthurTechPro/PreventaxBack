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
  Observaciones,
} from '../models';
import {RevisionesRepository} from '../repositories';

export class RevisionesObservacionesController {
  constructor(
    @repository(RevisionesRepository) protected revisionesRepository: RevisionesRepository,
  ) { }

  @get('/revisiones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Array of Revisiones has many Observaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Observaciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Observaciones>,
  ): Promise<Observaciones[]> {
    return this.revisionesRepository.RevisionObs(id).find(filter);
  }

  @post('/revisiones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Revisiones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Observaciones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Revisiones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observaciones, {
            title: 'NewObservacionesInRevisiones',
            exclude: ['Id'],
            optional: ['IdRevision']
          }),
        },
      },
    }) observaciones: Omit<Observaciones, 'Id'>,
  ): Promise<Observaciones> {
    return this.revisionesRepository.RevisionObs(id).create(observaciones);
  }

  @patch('/revisiones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Revisiones.Observaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observaciones, {partial: true}),
        },
      },
    })
    observaciones: Partial<Observaciones>,
    @param.query.object('where', getWhereSchemaFor(Observaciones)) where?: Where<Observaciones>,
  ): Promise<Count> {
    return this.revisionesRepository.RevisionObs(id).patch(observaciones, where);
  }

  @del('/revisiones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Revisiones.Observaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Observaciones)) where?: Where<Observaciones>,
  ): Promise<Count> {
    return this.revisionesRepository.RevisionObs(id).delete(where);
  }
}
