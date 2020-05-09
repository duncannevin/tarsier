import {Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common'
import {UsersService} from './users.service'
import {UserEntity} from './user.entity'
import {Body} from '@nestjs/common/decorators/http/route-params.decorator'
import {CreateUserDto} from './dto/create-user.dto'
import {LoginUserDto} from './dto/login-user.dto'
import {HttpAuthGuard} from '../guards/http-auth.guard'
import {IsSameUserGuard} from '../guards/is-same-user.guard'

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  @UseGuards(HttpAuthGuard)
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll()
  }

  @UseGuards(HttpAuthGuard, IsSameUserGuard)
  @Get('/:id')
  findOne(@Param('id') id): Promise<UserEntity> {
    return this.usersService.findOne(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<boolean> {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(HttpAuthGuard, IsSameUserGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.usersService.login(loginUserDto)
  }
}

