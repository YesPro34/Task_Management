// filter-tasks.dto.ts
import { Status } from '../../enums/status.enum';
import { IsEnum } from 'class-validator';

export class FilterTasksDto {
  @IsEnum(Status, {
    message: `Status must be one of: ${Object.values(Status).join(', ')}`,
  })
  status: Status;
}