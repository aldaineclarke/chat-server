/* eslint-disable prettier/prettier */
import {  Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserInterface } from 'src/users/users.interface';
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
        return this.userService.createUser(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getProtectedRoute(@Request() req){
        return req.user
    }

}
