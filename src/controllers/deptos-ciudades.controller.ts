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
  Ciudades, Deptos
} from '../models';
import {DeptosRepository} from '../repositories';

export class GenDeptosGenCiudadesController {
  constructor(
    @repository(DeptosRepository) protected deptosRepository: DeptosRepository,
  ) { }

  @get('/deptos/{id}/gen-ciudades', {
    responses: {
      '200': {
        description: 'Array of GenDeptos has many GenCiudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Ciudades>,
  ): Promise<Ciudades[]> {
    return this.deptosRepository.FKDeptosCiudad(id).find(filter);
  }

  @post('/deptos/{id}/gen-ciudades', {
    responses: {
      '200': {
        description: 'GenDeptos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudades)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Deptos.prototype.IdDepto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {
            title: 'NewGenCiudadesInGenDeptos',
            exclude: ['IdCiudad'],
            optional: ['IdDepto']
          }),
        },
      },
    }) ciudades: Omit<Ciudades, 'IdCiudad'>,
  ): Promise<Ciudades> {
    return this.deptosRepository.FKDeptosCiudad(id).create(ciudades);
  }

  @patch('/deptos/{id}/gen-ciudades', {
    responses: {
      '200': {
        description: 'GenDeptos.GenCiudades PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {partial: true}),
        },
      },
    })
    ciudades: Partial<Ciudades>,
    @param.query.object('where', getWhereSchemaFor(Ciudades)) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.deptosRepository.FKDeptosCiudad(id).patch(ciudades, where);
  }

  @del('/deptos/{id}/gen-ciudades', {
    responses: {
      '200': {
        description: 'GenDeptos.GenCiudades DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ciudades)) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.deptosRepository.FKDeptosCiudad(id).delete(where);
  }
}
