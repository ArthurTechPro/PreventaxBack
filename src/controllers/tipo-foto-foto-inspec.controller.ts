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
  FotoInspec, TipoFoto
} from '../models';
import {TipoFotoRepository} from '../repositories';

export class TipoFotoFotoInspecController {
  constructor(
    @repository(TipoFotoRepository) protected tipoFotoRepository: TipoFotoRepository,
  ) { }

  @get('/tipo-fotos/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'Array of TipoFoto has many FotoInspec',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FotoInspec)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FotoInspec>,
  ): Promise<FotoInspec[]> {
    return this.tipoFotoRepository.FKTipoFotoInspec(id).find(filter);
  }

  @authenticate('TokenStrategy')
  @post('/tipo-fotos/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'TipoFoto model instance',
        content: {'application/json': {schema: getModelSchemaRef(FotoInspec)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoFoto.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {
            title: 'NewFotoInspecInTipoFoto',
            exclude: ['Id'],
            optional: ['IdTipoFoto']
          }),
        },
      },
    }) fotoInspec: Omit<FotoInspec, 'Id'>,
  ): Promise<FotoInspec> {
    return this.tipoFotoRepository.FKTipoFotoInspec(id).create(fotoInspec);
  }

  @authenticate('TokenStrategy')
  @patch('/tipo-fotos/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'TipoFoto.FotoInspec PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoInspec, {partial: true}),
        },
      },
    })
    fotoInspec: Partial<FotoInspec>,
    @param.query.object('where', getWhereSchemaFor(FotoInspec)) where?: Where<FotoInspec>,
  ): Promise<Count> {
    return this.tipoFotoRepository.FKTipoFotoInspec(id).patch(fotoInspec, where);
  }

  @authenticate('TokenStrategy')
  @del('/tipo-fotos/{id}/foto-inspecs', {
    responses: {
      '200': {
        description: 'TipoFoto.FotoInspec DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FotoInspec)) where?: Where<FotoInspec>,
  ): Promise<Count> {
    return this.tipoFotoRepository.FKTipoFotoInspec(id).delete(where);
  }
}
