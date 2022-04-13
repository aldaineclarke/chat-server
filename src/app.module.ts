/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/Mongoose';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsController } from './controllers/rooms/rooms.controller';
import { RoomsModule } from './controllers/rooms/rooms.module';
@Module({
  imports: [
    MessagesModule,
    LoginModule,
    UsersModule,
    AuthModule,
    RoomsModule,
    MongooseModule.forRoot(process.env.DATABASE_URI)
  ],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
