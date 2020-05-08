import {Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common'
import {UsersService} from './users.service'
import {User} from './user.entity'
import {Body} from '@nestjs/common/decorators/http/route-params.decorator'
import {CreateUserDto} from './dto/create-user.dto'
import {LoginUserDto} from './dto/login-user.dto'
import {JwtAuthGuard} from './jwt-auth.guard'

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get('/:id')
  findOne(@Param('id') id): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<object | boolean> {
    return this.usersService.login(loginUserDto)
  }
}

