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
  Observaciones, Preguntas
} from '../models';
import {PreguntasRepository} from '../repositories';

export class PreguntasObservacionesController {
  constructor(
    @repository(PreguntasRepository) protected preguntasRepository: PreguntasRepository,
  ) { }

  @get('/preguntas/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Array of Preguntas has many Observaciones',
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
    return this.preguntasRepository.FKPreguntaObserva(id).find(filter);
  }

  @post('/preguntas/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Preguntas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Observaciones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Preguntas.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observaciones, {
            title: 'NewObservacionesInPreguntas',
            exclude: ['Id'],
            optional: ['IdPregunta']
          }),
        },
      },
    }) observaciones: Omit<Observaciones, 'Id'>,
  ): Promise<Observaciones> {
    return this.preguntasRepository.FKPreguntaObserva(id).create(observaciones);
  }

  @patch('/preguntas/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Preguntas.Observaciones PATCH success count',
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
    return this.preguntasRepository.FKPreguntaObserva(id).patch(observaciones, where);
  }

  @del('/preguntas/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Preguntas.Observaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Observaciones)) where?: Where<Observaciones>,
  ): Promise<Count> {
    return this.preguntasRepository.FKPreguntaObserva(id).delete(where);
  }
}
