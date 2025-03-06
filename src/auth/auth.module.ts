import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { JWT_SECRET } from 'src/config/jwt-secret';

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
