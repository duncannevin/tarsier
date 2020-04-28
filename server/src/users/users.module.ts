import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User], 'users'),
        AuthModule
    ],
    exports: [TypeOrmModule, UsersService],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
