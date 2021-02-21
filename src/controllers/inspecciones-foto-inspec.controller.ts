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
  FotoInspec, Inspecciones
} from '../models';
import {InspeccionesRepository} from '../repositories';

export class InspeccionesFotoInspecController {
  constructor(
    @repository(InspeccionesRepository) protected inspeccionesRepository: InspeccionesRepository,
  ) { }

  @get('/inspecciones/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Array of Inspecciones has many FotoInspec',
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
    return this.inspeccionesRepository.FKInspecFoto(id).find(filter);
  }

  @post('/inspecciones/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(FotoInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inspecciones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {
            title: 'NewFotoInspecInInspecciones',
            exclude: ['Id'],
            optional: ['IdInspec']
          }),
        },
      },
    }) fotoInspec: Omit<FotoInspec, 'Id'>,
  ): Promise<FotoInspec> {
    return this.inspeccionesRepository.FKInspecFoto(id).create(fotoInspec);
  }

  @patch('/inspecciones/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.FotoInspec PATCH success count',
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
    return this.inspeccionesRepository.FKInspecFoto(id).patch(fotoInspec, where);
  }

  @del('/inspecciones/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.FotoInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FotoInspec)) where?: Where<FotoInspec>,
  ): Promise<Count> {
    return this.inspeccionesRepository.FKInspecFoto(id).delete(where);
  }
}
