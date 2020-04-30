import {Entity, Column, ObjectIdColumn, ObjectID, BeforeInsert} from 'typeorm';
import * as crypto from "crypto";

@Entity()
export class User {

    constructor(){}

    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        unique: true
    })
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

    @BeforeInsert()
    private beforeInsert() {
        this.salt = this.generateSalt();
        this.password = this.generatePasswordHash(this.password, this.salt);
    }

    private generateSalt = (): string => crypto.randomBytes(256).toString('hex');

    private generatePasswordHash = (password, salt): string => crypto.createHmac('sha256', salt).update(password).digest('hex');

    verifyPassword = (password, salt, passwordHash): boolean => this.generatePasswordHash(password, salt) === passwordHash;

    getPublicInfo = (): object => {
        return {
            id: this.id.toString(),
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName
        };
    }
}
