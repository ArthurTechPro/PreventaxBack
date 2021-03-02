
import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {ServiceKeys as keys} from '../config/service-keys';
import {Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt-decrypt.services';

export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @authenticate('TokenStrategy')
  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['Id'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'Id'>,
  ): Promise<Usuarios> {
    usuarios.Passsword = new EncryptDecrypt(keys.MD5).encrypt(usuarios.Passsword);
    return this.usuariosRepository.create(usuarios);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @authenticate('TokenStrategy')
  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @authenticate('TokenStrategy')
  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @authenticate('TokenStrategy')
  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @authenticate('TokenStrategy')
  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
}
