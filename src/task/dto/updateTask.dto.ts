import { IsString, IsOptional, IsEnum, IsUUID, IsNotEmpty } from 'class-validator';
import { Status } from '../../enums/status.enum';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}