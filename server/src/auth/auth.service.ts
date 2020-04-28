import { Injectable } from '@nestjs/common';
import * as crypto from "crypto";

@Injectable()
export class AuthService {

    generateSalt = (): string => crypto.randomBytes(256).toString('hex');


    generatePasswordHash = (password, salt): string => crypto.createHmac('sha256', salt).update(password).digest('hex');

    verifyPassword = (password, salt, passwordHash): boolean => this.generatePasswordHash(password, salt) === passwordHash;
}
