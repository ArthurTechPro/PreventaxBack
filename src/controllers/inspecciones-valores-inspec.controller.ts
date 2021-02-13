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
  ValoresInspec,
} from '../models';
import {InspeccionesRepository} from '../repositories';

export class InspeccionesValoresInspecController {
  constructor(
    @repository(InspeccionesRepository) protected inspeccionesRepository: InspeccionesRepository,
  ) { }

  @get('/inspecciones/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'Array of Inspecciones has many ValoresInspec',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ValoresInspec)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ValoresInspec>,
  ): Promise<ValoresInspec[]> {
    return this.inspeccionesRepository.InspecVal(id).find(filter);
  }

  @post('/inspecciones/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(ValoresInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inspecciones.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValoresInspec, {
            title: 'NewValoresInspecInInspecciones',
            exclude: ['Id'],
            optional: ['IdInspec']
          }),
        },
      },
    }) valoresInspec: Omit<ValoresInspec, 'Id'>,
  ): Promise<ValoresInspec> {
    return this.inspeccionesRepository.InspecVal(id).create(valoresInspec);
  }

  @patch('/inspecciones/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.ValoresInspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ValoresInspec, {partial: true}),
        },
      },
    })
    valoresInspec: Partial<ValoresInspec>,
    @param.query.object('where', getWhereSchemaFor(ValoresInspec)) where?: Where<ValoresInspec>,
  ): Promise<Count> {
    return this.inspeccionesRepository.InspecVal(id).patch(valoresInspec, where);
  }

  @del('/inspecciones/{id}/valores-inspecs', {
    responses: {
      '200': {
        description: 'Inspecciones.ValoresInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ValoresInspec)) where?: Where<ValoresInspec>,
  ): Promise<Count> {
    return this.inspeccionesRepository.InspecVal(id).delete(where);
  }
}
