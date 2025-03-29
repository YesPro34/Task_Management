import { IsEmail, IsString, IsUUID, isUUID } from "class-validator"

export class AuthResult
{ 
    @IsUUID()
    userId : string

    @IsString()
    accessToken : string


    @IsEmail()
    email : string

 }