import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User, 'users')
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find().then((users: User[]) => {
            return users;
        });
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({
            where: {
                username: username
            }
        })
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async login(loginUserDto: LoginUserDto) {
        return this.findByUsername(loginUserDto.username).then((user) => {
            if(user.verifyPassword(loginUserDto.password, user.salt, user.password)){
                let userObj: object = user.getPublicInfo();
                try{
                    const jwt: string = this.jwtService.sign(userObj);
                    userObj['jwt'] = jwt;
                    return userObj;
                }catch(e){
                    console.log(e);
                }
            }else{
                return false;
            };
        }).catch(() => false);
    }
}
