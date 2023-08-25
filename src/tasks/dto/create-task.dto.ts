import { IsEnum, IsString } from 'class-validator';
import { PriorityLevel } from 'tasks/enums/task.enums';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(PriorityLevel)
  priority: PriorityLevel;
}
