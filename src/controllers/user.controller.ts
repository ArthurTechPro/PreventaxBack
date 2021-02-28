// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {NitsRepository} from '../repositories/nits.repository';
import {UsuariosRepository} from '../repositories/usuarios.repository';
import {AuthService} from '../services/auth.service';

class Credencials {
  email: string;
  passwd: string;
}

/**
class PasswordResetData {
  email: string;
  type: number;
}
**/

class ChangePasswordData {
  id: number;
  currentPassword: string;
  newPassword: string;
}

export class UserController {

  authService: AuthService;

  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    @repository(NitsRepository)
    public nitsRepository: NitsRepository

  ) {
    this.authService = new AuthService(this.usuariosRepository);
  }
  @post('/login', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async login(
    @requestBody() credencials: Credencials
  ): Promise<object> {
    console.log(credencials);

    const user = await this.authService.identify(credencials.email, credencials.passwd);
    if (user) {
      const tk = await this.authService.generateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }

  /**
    @post('/password-reset', {
      responses: {
        '200': {
          description: 'Login for users'
        }
      }
    })
    async reset(
      @requestBody() email: string
    ): Promise<boolean> {
      let randomPassword = await this.authService.resetPassword(email);
      console.log(randomPassword);
      if (randomPassword) {
        // send sms or mail with new password
        // 1. SMS
        // 2. Mail
        // ....
        let user = await this.usuariosRepository.findOne({where: {Email: email}})
        switch (passwordResetData.type) {
          case 1:
            if (user) {
              let notification = new SmsNotification({
                body: `Su nueva contraseña es: ${randomPassword}`,
                to: user.te
              });
              let sms = await new NotificationService().SmsNotification(notification);
              if (sms) {
                console.log("sms message sent");
                return true
              }
              throw new HttpErrors[400]("Phone is not found");
            }
            throw new HttpErrors[400]("user not found");

            break;
          case 2:
            // send mail
            if (student) {
              let notification = new EmailNotification({
                textBody: `Su nueva contraseña es: ${randomPassword}`,
                htmlBody: `Su nueva contraseña es: ${randomPassword}`,
                to: student.email,
                subject: 'Nueva contraseña'
              });
              let mail = await new NotificationService().MailNotification(notification);
              if (mail) {
                console.log("mail message sent");
                return true
              }
              throw new HttpErrors[400]("Email is not found");
            }
            throw new HttpErrors[400]("User not found");
            break;

          default:
            throw new HttpErrors[400]("This notification type is not supported.");
            break;
        }
      }
      throw new HttpErrors[400]("User not found");
    }

  */

  @post('/change-password', {
    responses: {
      '200': {
        description: 'Login for users'
      }
    }
  })
  async changePassword(
    @requestBody() changePasswordData: ChangePasswordData
  ): Promise<Boolean> {
    const user = await this.authService.verifyUserToChangePassword(changePasswordData.id, changePasswordData.currentPassword);
    if (user) {
      return this.authService.changePassword(changePasswordData.id, changePasswordData.newPassword);
    }
    throw new HttpErrors[400]("User not found");
  }

}

