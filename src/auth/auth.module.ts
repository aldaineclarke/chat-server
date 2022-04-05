/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import {JwtModule} from "@nestjs/jwt"
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [ConfigModule, UsersModule, PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    // secret: "SOMETHING"
    signOptions: { expiresIn: '60s'},
  })],
  exports: [AuthService]
})
export class AuthModule {}
