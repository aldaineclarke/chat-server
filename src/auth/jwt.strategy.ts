/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
// import { from } from "rxjs";
import { UserService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
        
    }
    async validate( payload: any){
        const user = await this.userService.findOnePromise(payload.name);
        return user;
    }
}