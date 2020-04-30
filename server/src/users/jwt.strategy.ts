import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {jwtConstants} from "../constants/jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any): Promise<any> {
        console.log('Validate Payload: ', payload);
        return {
            id: payload.id,
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName
        }
    }
}
