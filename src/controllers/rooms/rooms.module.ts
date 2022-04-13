/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from 'src/Schemas/room.schema';
import { UsersModule } from 'src/users/users.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
    controllers:[RoomsController],
    imports: [MongooseModule.forFeature([{name: 'Room', schema: RoomSchema}]),UsersModule],
    providers: [RoomsService]
})
export class RoomsModule {}
