import {Entity, Column, ObjectIdColumn, ObjectID, BeforeInsert} from 'typeorm'
import {JwtService} from '@nestjs/jwt'
import * as crypto from 'crypto'
import {User} from '../dto/user.dto'
import {UnauthorizedException} from '@nestjs/common'

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column({
    unique: true
  })
  username: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  password: string

  @Column({default: true})
  isActive: boolean

  @Column()
  salt: string

  @BeforeInsert()
  private beforeInsert() {
    this.salt = this.generateSalt()
    this.password = this.generatePasswordHash(this.password, this.salt)
  }

  private generateSalt = (): string => crypto.randomBytes(256).toString('hex')

  private generatePasswordHash = (password, salt): string => crypto.createHmac('sha256', salt).update(password).digest('hex')

  verifyPassword(reqPassword): boolean {
    if (!(this.generatePasswordHash(reqPassword, this.salt) === this.password)) throw new UnauthorizedException()

    return true
  }

  getPublicInfo(): User {
    return new User(this)
  }
}
