import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {User} from './user.entity'
import {CreateUserDto} from './dto/create-user.dto'
import {LoginUserDto} from './dto/login-user.dto'
import {TarsierLogger} from '../logger/tarsier.logger'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'users')
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private logger: TarsierLogger
  ) {
    logger.setContext('UsersService')
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find().then((users: User[]) => {
      return users
    })
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username: username
      }
    })
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const user = this.usersRepository.create(createUserDto)
    try {
      await this.usersRepository.save(user)
      return true
    } catch (e) {

      if (e.code && e.code === 11000) {
        throw new BadRequestException()
      }

      throw new InternalServerErrorException()
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async login(loginUserDto: LoginUserDto) {
    return this.findByUsername(loginUserDto.username).then((user) => {
      if (user.verifyPassword(loginUserDto.password, user.salt, user.password)) {
        const userObj: object = user.getPublicInfo()
        try {
          const jwt: string = this.jwtService.sign(userObj)
          userObj['jwt'] = jwt
          return userObj
        } catch (e) {
          console.log(e)
        }
      } else {
        return false
      }

    }).catch(() => false)
  }
}
