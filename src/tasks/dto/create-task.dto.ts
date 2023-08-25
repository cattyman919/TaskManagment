import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PriorityLevel, TaskStatus } from 'tasks/enums/task.enums';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PriorityLevel)
  @IsNotEmpty()
  priority: PriorityLevel;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus = TaskStatus.TO_DO;
}
