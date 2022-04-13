/* eslint-disable prettier/prettier */
import {  Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserInterface } from 'src/Schemas/user.schema';
import { UserService } from 'src/users/users.service';

@Controller()
export class LoginController {

    constructor(private readonly userService: UserService, private readonly authService:AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    LoginUser(@Req() req:any){
        return this.authService.login(req.user);
    }

    @Post('signUp')
    SignUpUser(@Body() data: UserInterface ){
        this.userService.createUser(data);
        return this.authService.generateToken(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getProtectedRoute(@Request() req){
        return req.user
    }
    @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    getUser(@Param() paramObj){
        return this.userService.findById(paramObj.id)
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('user/:id')
    // getUser(@Param() paramObj){
    //     return this.userService.findById(paramObj.id)
    // }



}
