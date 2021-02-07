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
  Preguntas,
  Observacion,
} from '../models';
import {PreguntasRepository} from '../repositories';

export class PreguntasObservacionController {
  constructor(
    @repository(PreguntasRepository) protected preguntasRepository: PreguntasRepository,
  ) { }

  @get('/preguntas/{id}/observacions', {
    responses: {
      '200': {
        description: 'Array of Preguntas has many Observacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Observacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Observacion>,
  ): Promise<Observacion[]> {
    return this.preguntasRepository.FKPregObs(id).find(filter);
  }

  @post('/preguntas/{id}/observacions', {
    responses: {
      '200': {
        description: 'Preguntas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Observacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Preguntas.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observacion, {
            title: 'NewObservacionInPreguntas',
            exclude: ['Id'],
            optional: ['IdPregunta']
          }),
        },
      },
    }) observacion: Omit<Observacion, 'Id'>,
  ): Promise<Observacion> {
    return this.preguntasRepository.FKPregObs(id).create(observacion);
  }

  @patch('/preguntas/{id}/observacions', {
    responses: {
      '200': {
        description: 'Preguntas.Observacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observacion, {partial: true}),
        },
      },
    })
    observacion: Partial<Observacion>,
    @param.query.object('where', getWhereSchemaFor(Observacion)) where?: Where<Observacion>,
  ): Promise<Count> {
    return this.preguntasRepository.FKPregObs(id).patch(observacion, where);
  }

  @del('/preguntas/{id}/observacions', {
    responses: {
      '200': {
        description: 'Preguntas.Observacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Observacion)) where?: Where<Observacion>,
  ): Promise<Count> {
    return this.preguntasRepository.FKPregObs(id).delete(where);
  }
}
