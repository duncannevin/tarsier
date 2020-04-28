import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from "./dto/create-user.dto";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User, 'users')
        private usersRepository: Repository<User>,
        private authService: AuthService
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
        // TODO: Find a way to add this to the BeforeInsert on the entity
        // I cannot figure out how to have NestJS Inject the AuthService into the TypeORM Entity
        user.salt = this.authService.generateSalt();
        user.password = this.authService.generatePasswordHash(createUserDto.password, user.salt);
        return this.usersRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
