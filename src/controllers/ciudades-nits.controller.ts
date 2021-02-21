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
import {Ciudades, Nits} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesNitsController {
  constructor(
    @repository(CiudadesRepository) protected ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'Array of GenCiudades has many Nits',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Nits)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Nits>,
  ): Promise<Nits[]> {
    return this.ciudadesRepository.FKCiuNit(id).find(filter);
  }

  @post('/ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nits)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudades.prototype.IdCiudad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {
            title: 'NewNitsInGenCiudades',
            exclude: ['Nit'],
            optional: ['IdCiudad']
          }),
        },
      },
    }) nits: Omit<Nits, 'Nit'>,
  ): Promise<Nits> {
    return this.ciudadesRepository.FKCiuNit(id).create(nits);
  }

  @patch('/ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiudades.Nits PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nits, {partial: true}),
        },
      },
    })
    nits: Partial<Nits>,
    @param.query.object('where', getWhereSchemaFor(Nits)) where?: Where<Nits>,
  ): Promise<Count> {
    return this.ciudadesRepository.FKCiuNit(id).patch(nits, where);
  }

  @del('/ciudades/{id}/nits', {
    responses: {
      '200': {
        description: 'GenCiudades.Nits DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Nits)) where?: Where<Nits>,
  ): Promise<Count> {
    return this.ciudadesRepository.FKCiuNit(id).delete(where);
  }
}
