import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthInput{
    @IsEmail()
    @IsNotEmpty()
    email : string; 

    @IsNotEmpty()
    @IsString()
    password: string
}

