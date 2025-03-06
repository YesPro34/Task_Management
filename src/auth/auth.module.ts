import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { JWT_SECRET } from 'src/config/jwt-secret';
import { AuthGuard } from './guards/auth.guard';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [UsersModule,
        JwtModule.register({
            global : true,
            secret: JWT_SECRET,
            signOptions: {expiresIn: '1d'}
        })
    ],
})
export class AuthModule {
    
}
