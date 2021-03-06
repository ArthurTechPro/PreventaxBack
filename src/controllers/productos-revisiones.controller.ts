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
  Productos,
  Revisiones
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosRevisionesController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Productos has many Revisiones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revisiones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Revisiones>,
  ): Promise<Revisiones[]> {
    return this.productosRepository.FKProductoRevision(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/productos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Productos.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInProductos',
            exclude: ['Id'],
            optional: ['IdProducto']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'Id'>,
  ): Promise<Revisiones> {
    return this.productosRepository.FKProductoRevision(id).create(revisiones);
  }

  @authenticate('TokenStrategy')
  @patch('/productos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Productos.Revisiones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Partial<Revisiones>,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.productosRepository.FKProductoRevision(id).patch(revisiones, where);
  }

  @authenticate('TokenStrategy')
  @del('/productos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Productos.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.productosRepository.FKProductoRevision(id).delete(where);
  }
}
