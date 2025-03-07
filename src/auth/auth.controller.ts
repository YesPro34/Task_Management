import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from './DTO/authInput.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({summary : "Log in with email and password"})
    @ApiResponse({ status: 201, description: 'Log in successfully' })
    @ApiResponse({ status: 404, description: 'Unauthorized' })
    @ApiBody({type: AuthInput })
    login(@Body() input:AuthInput){
        return this.authService.authenticate(input)
    }

    @Get('me')
    @ApiOperation({summary : "get the logged in user"})
    @ApiResponse({ status: 200, description: 'Return users info successfully' })
    @ApiResponse({ status: 404, description: 'Unauthorized' })
    @UseGuards(AuthGuard)
    getUserInfo(@Request() request){
        return request.user;
    }
}
