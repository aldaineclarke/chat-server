/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoomsService } from './rooms.service';

@Controller()
export class RoomsController {


    constructor(private roomsService:RoomsService){

    }
    // These are the routes for the conversations Controllers
    @UseGuards(JwtAuthGuard)
    @Get('rooms/:id')
    getAllUserConversations(@Param() paramObj){
        console.log(paramObj.id)
        return this.roomsService.getAllUserConversations(paramObj.id)
    }
    @UseGuards(JwtAuthGuard)
    @Post('rooms/:id')
    createRoom(@Param() paramObj, @Body() data){
        console.log(paramObj.id)
        return this.roomsService.createConversation(paramObj.id,data)
    }
}
