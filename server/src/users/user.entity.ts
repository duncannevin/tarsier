import {Entity, Column, ObjectIdColumn, ObjectID, BeforeInsert} from 'typeorm';
import {AuthService} from "../auth/auth.service";

@Entity()
export class User {

    constructor(private authService: AuthService){}

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column()
    salt: string;
}
