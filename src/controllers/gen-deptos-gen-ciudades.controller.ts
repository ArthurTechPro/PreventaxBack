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
  GenDeptos,
  GenCiudades,
} from '../models';
import {GenDeptosRepository} from '../repositories';

export class GenDeptosGenCiudadesController {
  constructor(
    @repository(GenDeptosRepository) protected genDeptosRepository: GenDeptosRepository,
  ) { }

  @get('/gen-deptos/{id}/gen-ciudades', {
    responses: {
      '200': {
        description: 'Array of GenDeptos has many GenCiudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GenCiudades)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<GenCiudades>,
  ): Promise<GenCiudades[]> {
    return this.genDeptosRepository.DepCiu(id).find(filter);
  }

  @post('/gen-deptos/{id}/gen-ciudades', {
    responses: {
      '200': {
        description: 'GenDeptos model instance',
        content: {'application/json': {schema: getModelSchemaRef(GenCiudades)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof GenDeptos.prototype.Codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenCiudades, {
            title: 'NewGenCiudadesInGenDeptos',
            exclude: ['Codigo'],
            optional: ['CodDepto']
          }),
        },
      },
    }) genCiudades: Omit<GenCiudades, 'Codigo'>,
  ): Promise<GenCiudades> {
    return this.genDeptosRepository.DepCiu(id).create(genCiudades);
  }

  @patch('/gen-deptos/{id}/gen-ciudades', {
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
          schema: getModelSchemaRef(GenCiudades, {partial: true}),
        },
      },
    })
    genCiudades: Partial<GenCiudades>,
    @param.query.object('where', getWhereSchemaFor(GenCiudades)) where?: Where<GenCiudades>,
  ): Promise<Count> {
    return this.genDeptosRepository.DepCiu(id).patch(genCiudades, where);
  }

  @del('/gen-deptos/{id}/gen-ciudades', {
    responses: {
      '200': {
        description: 'GenDeptos.GenCiudades DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(GenCiudades)) where?: Where<GenCiudades>,
  ): Promise<Count> {
    return this.genDeptosRepository.DepCiu(id).delete(where);
  }
}
