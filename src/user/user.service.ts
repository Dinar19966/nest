import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      }
    })

    if (existUser) throw new BadRequestException('Имя пользователя занято')
    const user = await this.userRepository.save({
      username: createUserDto.username,
      password: createUserDto.password // зашифровать
    })
    const token = this.jwtService.sign({username: createUserDto.username})
    return {user, token}
  }

  findAll() {
    return `This action returns all user`;
  } 

  async findOne(username: string){
    return await this.userRepository.findOne({
      where: {
        username: username
      }
    })
  }

}
