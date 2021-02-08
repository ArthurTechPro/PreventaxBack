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
  Inspecciones,
  Observacion,
} from '../models';
import {InspeccionesRepository} from '../repositories';

export class InspeccionesObservacionController {
  constructor(
    @repository(InspeccionesRepository) protected inspeccionesRepository: InspeccionesRepository,
  ) { }

  @get('/inspecciones/{id}/observacions', {
    responses: {
      '200': {
        description: 'Array of Inspecciones has many Observacion',
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
    return this.inspeccionesRepository.FKInsObs(id).find(filter);
  }

  @post('/inspecciones/{id}/observacions', {
    responses: {
      '200': {
        description: 'Inspecciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Observacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inspecciones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Observacion, {
            title: 'NewObservacionInInspecciones',
            exclude: ['Id'],
            optional: ['IdInspec']
          }),
        },
      },
    }) observacion: Omit<Observacion, 'Id'>,
  ): Promise<Observacion> {
    return this.inspeccionesRepository.FKInsObs(id).create(observacion);
  }

  @patch('/inspecciones/{id}/observacions', {
    responses: {
      '200': {
        description: 'Inspecciones.Observacion PATCH success count',
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
    return this.inspeccionesRepository.FKInsObs(id).patch(observacion, where);
  }

  @del('/inspecciones/{id}/observacions', {
    responses: {
      '200': {
        description: 'Inspecciones.Observacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Observacion)) where?: Where<Observacion>,
  ): Promise<Count> {
    return this.inspeccionesRepository.FKInsObs(id).delete(where);
  }
}
