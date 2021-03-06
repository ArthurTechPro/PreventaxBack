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
  Inspecciones, Productos
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosInspeccionesController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }


  @get('/productos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Array of Productos has many Inspecciones',
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
    return this.productosRepository.FKProducInspec(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/productos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inspecciones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Productos.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inspecciones, {
            title: 'NewInspeccionesInProductos',
            exclude: ['Id'],
            optional: ['IdProducto']
          }),
        },
      },
    }) inspecciones: Omit<Inspecciones, 'Id'>,
  ): Promise<Inspecciones> {
    return this.productosRepository.FKProducInspec(id).create(inspecciones);
  }

  @authenticate('TokenStrategy')
  @patch('/productos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Productos.Inspecciones PATCH success count',
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
    return this.productosRepository.FKProducInspec(id).patch(inspecciones, where);
  }

  @authenticate('TokenStrategy')
  @del('/productos/{id}/inspecciones', {
    responses: {
      '200': {
        description: 'Productos.Inspecciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inspecciones)) where?: Where<Inspecciones>,
  ): Promise<Count> {
    return this.productosRepository.FKProducInspec(id).delete(where);
  }
}
