import {BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {UserEntity} from './user.entity'
import {CreateUserDto} from './dto/create-user.dto'
import {LoginUserDto} from './dto/login-user.dto'
import {TarsierLogger} from '../logger/tarsier.logger'
import {JwtService} from '@nestjs/jwt'
import {updateFileWithText} from 'ts-loader/dist/servicesHost'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity, 'users')
    private usersRepository: Repository<UserEntity>,
    private logger: TarsierLogger,
    private readonly jwtService: JwtService
  ) {
    logger.setContext('UsersService')
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find().then((users: UserEntity[]) => {
      return users
    })
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id)
  }

  findByUsername(username: string): Promise<UserEntity> {
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
    try {
      const user: UserEntity = await this.findByUsername(loginUserDto.username)
      user.verifyPassword(loginUserDto.password)
      const jwt = this.jwtService.sign({...user.getPublicInfo()})
      return {...user.getPublicInfo(), jwt}
    } catch (e) {

      if (e.status === 401) {
        throw e
      }

      throw new InternalServerErrorException()
    }
  }
}
