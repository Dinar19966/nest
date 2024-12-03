import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userServise: UserService,
    private jwtService : JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userServise.findOne(username);
    if (user && user.password === password) { //как зашифрую пароль, тут нужно будет расшифровать
      return user;
    }
    throw new BadRequestException('Имя пользователя или пароль неверны')
    
  }

  async login(user: IUser) {
   const {id, username} = user
   return {
    id,
    username,
    token: this.jwtService.sign({id: user.id, username: user.username})
   }
  }
}
  