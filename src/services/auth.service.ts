import {repository} from '@loopback/repository';
import {generate as generator} from 'generate-password';
import {PasswordKeys as passKeys} from '../config/password-keys';
import {ServiceKeys as keys} from '../config/service-keys';
import {Usuarios} from '../models/usuarios.model';
import {UsuariosRepository} from '../repositories/usuarios.repository';
import {EncryptDecrypt} from './encrypt-decrypt.services';
const jwt = require("jsonwebtoken");

export class AuthService {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository
  ) {

  }
  /**
   *
   * @param username
   * @param password
   */
  async identify(email: string, password: string): Promise<Usuarios | false> {
    console.log(`Email: ${email} - Password: ${password}`);
    const user = await this.usuariosRepository.findOne({where: {Email: email}});
    if (user) {
      const cryptPass = new EncryptDecrypt(keys.MD5).encrypt(password);
      if (user.Passsword === cryptPass) {
        return user;
      }
    }
    return false;
  }

  /**
   * Verify if cureent password belongs to user
   * @param id id of user to verify
   * @param password current password
   */

  async verifyUserToChangePassword(id: number, password: string): Promise<Usuarios | false> {
    //console.log(`Username: ${username} - Password: ${password}`);
    const user = await this.usuariosRepository.findById(id);
    if (user) {
      const cryptPass = new EncryptDecrypt(keys.MD5).encrypt(password);
      if (user.Passsword === cryptPass) {
        return user;
      }
    }
    return false;
  }
  /**
   *
   * @param id user id to update passowrd
   * @param password new password
   */
  async changePassword(id: number, password: string): Promise<Boolean> {
    //console.log(`Username: ${username} - Password: ${password}`);
    const user = await this.usuariosRepository.findById(id);
    if (user) {
      const cryptPass = new EncryptDecrypt(keys.MD5).encrypt(password);
      user.Passsword = cryptPass;
      await this.usuariosRepository.updateById(id, user);
      return true;
    }
    return false;
  }

  /**
   *
   * @param user
   */
  async generateToken(ususario: Usuarios) {
    ususario.Passsword = '';
    const token = jwt.sign({
      exp: keys.TOKEN_EXPIRA,
      data: {
        _id: ususario.IdNit,
        username: ususario.Usuario,
        roll: ususario.IdRoll,
        isAdmin: ususario.IsAdmin
      }
    },
      keys.JWT_SECRET);
    return token;
  }

  /**
   * To verify a given token
   * @param token
   */
  async verifyToken(token: string) {
    try {
      const data = jwt.verify(token, keys.JWT_SECRET).data;
      return data;
    } catch (error) {
      return false;
    }
  }

  /**
   * Reset the user password when it is missed
   * @param username
   */
  async resetPassword(email: string): Promise<string | false> {
    const user = await this.usuariosRepository.findOne({where: {Email: email}});
    if (user) {
      const randomPassword = generator({
        length: passKeys.LENGTH,
        numbers: passKeys.NUMBERS,
        lowercase: passKeys.LOWERCASE,
        uppercase: passKeys.UPPERCASE
      });
      const crypter = new EncryptDecrypt(keys.MD5);
      const password = crypter.encrypt(crypter.encrypt(randomPassword));
      user.Passsword = password;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.usuariosRepository.replaceById(user.Id, user);
      return randomPassword;
    }
    return false;
  }

}
