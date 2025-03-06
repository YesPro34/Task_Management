import {IsEnum, IsNotEmpty, IsString, IsUUID} from 'class-validator'
import { Status } from '../../enums/status.enum';

export class createTaskDto{

    @IsString()
    @IsNotEmpty()
    title :string

    @IsString()
    description :string

    @IsEnum(Status)
    status: Status

}