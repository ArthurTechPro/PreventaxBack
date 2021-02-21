import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Nits, Usuarios
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosNitsController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/nits', {
    responses: {
      '200': {
        description: 'Nits belonging to Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Nits)},
          },
        },
      },
    },
  })
  async getNits(
    @param.path.number('id') id: typeof Usuarios.prototype.IdUsuario,
  ): Promise<Nits> {
    return this.usuariosRepository.btUsuNit(id);
  }
}
