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
import {Clases} from '../models';
import {ClasesRepository} from '../repositories';

export class ClasesController {
  constructor(
    @repository(ClasesRepository)
    public clasesRepository: ClasesRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/clases')
  @response(200, {
    description: 'Clases model instance',
    content: {'application/json': {schema: getModelSchemaRef(Clases)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clases, {
            title: 'NewClases',

          }),
        },
      },
    })
    clases: Clases,
  ): Promise<Clases> {
    return this.clasesRepository.create(clases);
  }

  @get('/clases/count')
  @response(200, {
    description: 'Clases model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Clases) where?: Where<Clases>,
  ): Promise<Count> {
    return this.clasesRepository.count(where);
  }

  @get('/clases')
  @response(200, {
    description: 'Array of Clases model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clases, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clases) filter?: Filter<Clases>,
  ): Promise<Clases[]> {
    return this.clasesRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/clases')
  @response(200, {
    description: 'Clases PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clases, {partial: true}),
        },
      },
    })
    clases: Clases,
    @param.where(Clases) where?: Where<Clases>,
  ): Promise<Count> {
    return this.clasesRepository.updateAll(clases, where);
  }

  @get('/clases/{id}')
  @response(200, {
    description: 'Clases model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clases, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Clases, {exclude: 'where'}) filter?: FilterExcludingWhere<Clases>
  ): Promise<Clases> {
    return this.clasesRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/clases/{id}')
  @response(204, {
    description: 'Clases PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clases, {partial: true}),
        },
      },
    })
    clases: Clases,
  ): Promise<void> {
    await this.clasesRepository.updateById(id, clases);
  }

  @authenticate('TokenStrategy')
  @put('/clases/{id}')
  @response(204, {
    description: 'Clases PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() clases: Clases,
  ): Promise<void> {
    await this.clasesRepository.replaceById(id, clases);
  }

  @authenticate('TokenStrategy')
  @del('/clases/{id}')
  @response(204, {
    description: 'Clases DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clasesRepository.deleteById(id);
  }
}
