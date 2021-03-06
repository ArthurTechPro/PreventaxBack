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
  FotoInspec, Preguntas
} from '../models';
import {PreguntasRepository} from '../repositories';

export class PreguntasFotoInspecController {
  constructor(
    @repository(PreguntasRepository) protected preguntasRepository: PreguntasRepository,
  ) { }

  @get('/preguntas/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Array of Preguntas has many FotoInspec',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FotoInspec)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FotoInspec>,
  ): Promise<FotoInspec[]> {
    return this.preguntasRepository.FKPreguntFoto(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/preguntas/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Preguntas model instance',
        content: {'application/json': {schema: getModelSchemaRef(FotoInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Preguntas.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {
            title: 'NewFotoInspecInPreguntas',
            exclude: ['Id'],
            optional: ['IdPregunta']
          }),
        },
      },
    }) fotoInspec: Omit<FotoInspec, 'Id'>,
  ): Promise<FotoInspec> {
    return this.preguntasRepository.FKPreguntFoto(id).create(fotoInspec);
  }

  @authenticate('TokenStrategy')
  @patch('/preguntas/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Preguntas.FotoInspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {partial: true}),
        },
      },
    })
    fotoInspec: Partial<FotoInspec>,
    @param.query.object('where', getWhereSchemaFor(FotoInspec)) where?: Where<FotoInspec>,
  ): Promise<Count> {
    return this.preguntasRepository.FKPreguntFoto(id).patch(fotoInspec, where);
  }

  @authenticate('TokenStrategy')
  @del('/preguntas/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Preguntas.FotoInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FotoInspec)) where?: Where<FotoInspec>,
  ): Promise<Count> {
    return this.preguntasRepository.FKPreguntFoto(id).delete(where);
  }
}
