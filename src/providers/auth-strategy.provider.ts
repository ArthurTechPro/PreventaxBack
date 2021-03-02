import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {UsuariosRepository} from '../repositories/usuarios.repository';
import {AuthService} from '../services/auth.service';

export class AuthStrategyProvider implements Provider<Strategy | undefined> {

  authService: AuthService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository
  ) {
    this.authService = new AuthService(usuariosRepository);
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;

    console.log(name);

    switch (name) {
      case 'BasicStrategy':
        return new BasicStrategy(this.verifyUser.bind(this));
      case 'TokenAdminStrategy':
        return new BearerStrategy(this.verifyAdminToken.bind(this));
      case 'TokenStrategy':
        return new BearerStrategy(this.verifyToken.bind(this));
      default:
        return Promise.reject(`The strategy ${name} is not available new.`);
    }
  }

  verifyUser(
    username: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    const user = this.authService.identify(username, password);
    return cb(null, user);
  }


  verifyAdminToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.verifyToken(token)
      .then(data => {
        if (data && data.isAdmin === true) {
          return cb(null, data);
        }
      })
      .catch(() => cb(null, false));
  }

  verifyToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.verifyToken(token)
      .then(data => {
        if (data && data.isAdmin === false) {
          console.log(data);
          return cb(null, data);
        }
      })
      .catch(() => cb(null, false));
  }
}
