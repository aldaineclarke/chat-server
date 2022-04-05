/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports:[MongooseModule.forFeature([{name: "User", schema: UserSchema}]), AuthModule, UsersModule],
  controllers: [LoginController],

})
export class LoginModule {}
