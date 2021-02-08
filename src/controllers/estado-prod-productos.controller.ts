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
  EstadoProd,
  Productos,
} from '../models';
import {EstadoProdRepository} from '../repositories';

export class EstadoProdProductosController {
  constructor(
    @repository(EstadoProdRepository) protected estadoProdRepository: EstadoProdRepository,
  ) { }

  @get('/estado-prods/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of EstadoProd has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.estadoProdRepository.FKEstProd(id).find(filter);
  }

  @post('/estado-prods/{id}/productos', {
    responses: {
      '200': {
        description: 'EstadoProd model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoProd.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInEstadoProd',
            exclude: ['Id'],
            optional: ['IdEstado']
          }),
        },
      },
    }) productos: Omit<Productos, 'Id'>,
  ): Promise<Productos> {
    return this.estadoProdRepository.FKEstProd(id).create(productos);
  }

  @patch('/estado-prods/{id}/productos', {
    responses: {
      '200': {
        description: 'EstadoProd.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.estadoProdRepository.FKEstProd(id).patch(productos, where);
  }

  @del('/estado-prods/{id}/productos', {
    responses: {
      '200': {
        description: 'EstadoProd.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.estadoProdRepository.FKEstProd(id).delete(where);
  }
}
