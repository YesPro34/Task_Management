import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/service//users.service';
import { AuthInput } from './DTO/authInput.dto';
import { AuthResult } from './DTO/authResult.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

type SignInData = { userId : string; email: string}

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    /**
     * Authenticates a user based on the provided input.
     * 
     * @param {AuthInput} input - The authentication input containing user credentials.
     * @returns {Promise<AuthResult>} A promise that resolves to the authentication result.
     * @throws {UnauthorizedException} If the user validation fails.
     */
    async authenticate(input: AuthInput): Promise<AuthResult>{
        const user = await this.validateUser(input)
        if(!user){
            throw new UnauthorizedException();
        }
        return this.signIn(user)
    }

    /**
     * Validates the user credentials.
     *
     * @param {AuthInput} input - The authentication input containing email and password.
     * @returns {Promise<SignInData | null>} - A promise that resolves to the sign-in data if the credentials are valid, otherwise null.
     */
    async validateUser(input: AuthInput): Promise<SignInData | null>{
        const user = await this.userService.findUserForAuth(input.email)
        if(!user){
            return null
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password)
        if(isPasswordValid){
            return {
                userId: user.id,
                email : user.email
            }
        }
        return null
    }

    /**
     * Signs in a user and generates an access token.
     *
     * @param {SignInData} user - The user data required for signing in.
     * @returns {Promise<{ accessToken: string, userId: string, email: string }>} An object containing the access token, user ID, and email.
     */
    async signIn(user: SignInData){
        const tokenPayload = {
            sub:user.userId,
            email : user.email
        }
        const accessToken = await this.jwtService.signAsync(tokenPayload)

        return {
            accessToken,
            userId: user.userId,
            email : user.email
        }
    }
}
