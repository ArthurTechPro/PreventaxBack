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
  Inspecciones,
  Observaciones
} from '../models';
import {InspeccionesRepository} from '../repositories';

export class InspeccionesObservacionesController {
  constructor(
    @repository(InspeccionesRepository) protected inspeccionesRepository: InspeccionesRepository,
  ) { }

  @get('/inspecciones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Array of Inspecciones has many Observaciones',
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
    return this.inspeccionesRepository.FKInspecObserva(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/inspecciones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Inspecciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Observaciones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inspecciones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observaciones, {
            title: 'NewObservacionesInInspecciones',
            exclude: ['Id'],
            optional: ['IdInspec']
          }),
        },
      },
    }) observaciones: Omit<Observaciones, 'Id'>,
  ): Promise<Observaciones> {
    return this.inspeccionesRepository.FKInspecObserva(id).create(observaciones);
  }

  @authenticate('TokenStrategy')
  @patch('/inspecciones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Inspecciones.Observaciones PATCH success count',
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
    return this.inspeccionesRepository.FKInspecObserva(id).patch(observaciones, where);
  }

  @authenticate('TokenStrategy')
  @del('/inspecciones/{id}/observaciones', {
    responses: {
      '200': {
        description: 'Inspecciones.Observaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Observaciones)) where?: Where<Observaciones>,
  ): Promise<Count> {
    return this.inspeccionesRepository.FKInspecObserva(id).delete(where);
  }
}
