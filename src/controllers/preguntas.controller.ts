import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Preguntas} from '../models';
import {PreguntasRepository} from '../repositories';

export class PreguntasController {
  constructor(
    @repository(PreguntasRepository)
    public preguntasRepository: PreguntasRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/preguntas')
  @response(200, {
    description: 'Preguntas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Preguntas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntas, {
            title: 'NewPreguntas',
            exclude: ['Id'],
          }),
        },
      },
    })
    preguntas: Omit<Preguntas, 'Id'>,
  ): Promise<Preguntas> {
    return this.preguntasRepository.create(preguntas);
  }

  @get('/preguntas/count')
  @response(200, {
    description: 'Preguntas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Preguntas) where?: Where<Preguntas>,
  ): Promise<Count> {
    return this.preguntasRepository.count(where);
  }

  @get('/preguntas')
  @response(200, {
    description: 'Array of Preguntas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Preguntas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Preguntas) filter?: Filter<Preguntas>,
  ): Promise<Preguntas[]> {
    return this.preguntasRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/preguntas')
  @response(200, {
    description: 'Preguntas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntas, {partial: true}),
        },
      },
    })
    preguntas: Preguntas,
    @param.where(Preguntas) where?: Where<Preguntas>,
  ): Promise<Count> {
    return this.preguntasRepository.updateAll(preguntas, where);
  }

  @get('/preguntas/{id}')
  @response(200, {
    description: 'Preguntas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Preguntas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Preguntas, {exclude: 'where'}) filter?: FilterExcludingWhere<Preguntas>
  ): Promise<Preguntas> {
    return this.preguntasRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/preguntas/{id}')
  @response(204, {
    description: 'Preguntas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preguntas, {partial: true}),
        },
      },
    })
    preguntas: Preguntas,
  ): Promise<void> {
    await this.preguntasRepository.updateById(id, preguntas);
  }

  @authenticate('TokenStrategy')
  @put('/preguntas/{id}')
  @response(204, {
    description: 'Preguntas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() preguntas: Preguntas,
  ): Promise<void> {
    await this.preguntasRepository.replaceById(id, preguntas);
  }

  @authenticate('TokenStrategy')
  @del('/preguntas/{id}')
  @response(204, {
    description: 'Preguntas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.preguntasRepository.deleteById(id);
  }
}
