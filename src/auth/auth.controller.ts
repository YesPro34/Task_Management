import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from './DTO/authInput.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input:AuthInput){
        return this.authService.authenticate(input)
    }

    @Get('me')
    @UseGuards(AuthGuard)
    getUserInfo(@Request() request){
        return request.user;
    }
}
