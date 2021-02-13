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
  EstadoInspec,
  Inspecciones,
} from '../models';
import {EstadoInspecRepository} from '../repositories';

export class EstadoInspecInspeccionesController {
  constructor(
    @repository(EstadoInspecRepository) protected estadoInspecRepository: EstadoInspecRepository,
  ) { }

  @get('/estado-inspecs/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Array of EstadoInspec has many Inspecciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inspecciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inspecciones>,
  ): Promise<Inspecciones[]> {
    return this.estadoInspecRepository.EstInspec(id).find(filter);
  }

  @post('/estado-inspecs/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'EstadoInspec model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inspecciones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoInspec.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {
            title: 'NewInspeccionesInEstadoInspec',
            exclude: ['Id'],
            optional: ['IdEstado']
          }),
        },
      },
    }) inspecciones: Omit<Inspecciones, 'Id'>,
  ): Promise<Inspecciones> {
    return this.estadoInspecRepository.EstInspec(id).create(inspecciones);
  }

  @patch('/estado-inspecs/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'EstadoInspec.Inspecciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {partial: true}),
        },
      },
    })
    inspecciones: Partial<Inspecciones>,
    @param.query.object('where', getWhereSchemaFor(Inspecciones)) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.estadoInspecRepository.EstInspec(id).patch(inspecciones, where);
  }

  @del('/estado-inspecs/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'EstadoInspec.Inspecciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inspecciones)) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.estadoInspecRepository.EstInspec(id).delete(where);
  }
}